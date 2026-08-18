<#
.SYNOPSIS
    Memuat .env ke variabel environment sesi PowerShell.

.DESCRIPTION
    Dipakai untuk perintah yang tidak bisa membaca .env sendiri — terutama
    `npx hyperframes`. Skrip Node cukup pakai flag bawaan Node 22:
        node --env-file=.env tools/skrip.mjs

    Variabel hanya berlaku di sesi terminal ini; buka terminal baru = jalankan lagi.

.EXAMPLE
    . .\tools\load-env.ps1
    npm run render:t15

.EXAMPLE
    . .\tools\load-env.ps1 -Path ..\\.env -Show
#>
[CmdletBinding()]
param(
    # Lokasi berkas .env. Default: .env di akar repo (satu tingkat di atas tools/).
    [string]$Path = (Join-Path $PSScriptRoot '..\.env'),

    # Tampilkan variabel yang dimuat. Nilai secret tetap disamarkan.
    [switch]$Show
)

if (-not (Test-Path $Path)) {
    Write-Error ".env tidak ditemukan di '$Path'. Salin dulu: Copy-Item .env.example .env"
    return
}

$secretPattern = 'KEY|SECRET|TOKEN|PASSWORD'
$loaded = @()
$blank  = @()

foreach ($line in Get-Content -Path $Path -Encoding UTF8) {
    $trimmed = $line.Trim()
    if ($trimmed -eq '' -or $trimmed.StartsWith('#')) { continue }

    $sep = $trimmed.IndexOf('=')
    if ($sep -lt 1) { continue }

    $name  = $trimmed.Substring(0, $sep).Trim()
    $value = $trimmed.Substring($sep + 1).Trim()

    # Buang komentar di ujung baris (hanya yang didahului spasi, di luar tanda kutip).
    if ($value -notmatch '^["'']') {
        $value = ($value -replace '\s+#.*$', '').Trim()
    } else {
        $value = $value.Trim('"', "'")
    }

    Set-Item -Path "Env:$name" -Value $value

    if ($value -eq '') {
        $blank += $name
    } else {
        $shown = if ($name -match $secretPattern) { '********' } else { $value }
        $loaded += [pscustomobject]@{ Name = $name; Value = $shown }
    }
}

Write-Host "Dimuat $($loaded.Count) variabel dari $((Resolve-Path $Path).Path)" -ForegroundColor Green

if ($Show) { $loaded | Format-Table -AutoSize }

if ($blank.Count -gt 0) {
    Write-Host "Belum diisi ($($blank.Count)): $($blank -join ', ')" -ForegroundColor DarkYellow
}
