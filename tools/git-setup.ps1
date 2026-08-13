<#
.SYNOPSIS
    Menyiapkan repo git yang aman untuk project ini.

.DESCRIPTION
    - git init (kalau belum) dengan branch default `main`
    - memasang hook pre-commit penolak secret dari tools/hooks/
    - memverifikasi .env benar-benar ter-ignore
    - melaporkan berkas apa saja yang AKAN ikut ter-push

    Aman dijalankan berulang kali. Tidak pernah melakukan commit atau push.

.EXAMPLE
    .\tools\git-setup.ps1
#>
[CmdletBinding()]
param()

$root = Split-Path $PSScriptRoot -Parent
Push-Location $root

try {
    # --- 1. init -------------------------------------------------------------
    if (-not (Test-Path (Join-Path $root ".git"))) {
        git init --initial-branch=main | Out-Null
        Write-Host "git init selesai (branch: main)" -ForegroundColor Green
    } else {
        Write-Host "Repo git sudah ada." -ForegroundColor DarkGray
    }

    # --- 2. hook -------------------------------------------------------------
    $src = Join-Path $PSScriptRoot "hooks\pre-commit"
    $dst = Join-Path $root ".git\hooks\pre-commit"
    Copy-Item $src $dst -Force
    Write-Host "Hook pre-commit terpasang." -ForegroundColor Green

    # --- 3. verifikasi .env ter-ignore --------------------------------------
    if (Test-Path (Join-Path $root ".env")) {
        git check-ignore -q .env
        if ($LASTEXITCODE -eq 0) {
            Write-Host ".env ter-ignore — aman." -ForegroundColor Green
        } else {
            Write-Host ".env TIDAK ter-ignore. JANGAN commit sebelum .gitignore diperbaiki." -ForegroundColor Red
        }
    }

    # --- 4. cari secret di berkas yang akan ikut ter-push -------------------
    $tracked = (git status --porcelain --untracked-files=all) |
        ForEach-Object { $_.Substring(3).Trim('"') } |
        Where-Object { $_ -and (Test-Path $_ -PathType Leaf) }

    $patterns = 'sk_[A-Za-z0-9]{20,}|gh[pos]_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----'
    $hits = @()
    foreach ($f in $tracked) {
        if ($f -eq "tools/hooks/pre-commit" -or $f -eq "tools\hooks\pre-commit") { continue }
        $m = Select-String -Path $f -Pattern $patterns -ErrorAction SilentlyContinue
        if ($m) { $hits += $m }
    }

    Write-Host ""
    if ($hits.Count -gt 0) {
        Write-Host "SECRET DITEMUKAN di berkas yang akan ter-push:" -ForegroundColor Red
        $hits | ForEach-Object { Write-Host ("  {0}:{1}" -f $_.Path, $_.LineNumber) -ForegroundColor Red }
    } else {
        Write-Host "Tidak ada pola secret di berkas yang akan ter-push." -ForegroundColor Green
    }

    Write-Host ""
    Write-Host ("Berkas yang akan masuk repo: {0}" -f $tracked.Count) -ForegroundColor Cyan
    Write-Host "Lihat daftarnya: git status --untracked-files=all --short"
}
finally {
    Pop-Location
}
