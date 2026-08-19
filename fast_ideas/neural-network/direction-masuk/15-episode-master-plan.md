<!-- UNGGAHAN USER KEDUA, APA ADANYA — 2026-08-19. JANGAN DISUNTING.

     Ini MENGGANTIKAN 30-second-shorts-production-standard.md sebagai peta seri:
     yang pertama merinci satu episode + standar produksi, yang ini merinci
     LIMA BELAS episode berikut urutannya. Yang pertama TIDAK dihapus — standar
     produksinya (§ 1–22, 24–26 di sana) masih berlaku dan tidak diulang di
     sini, dan Episode 01 di kedua berkas sama isinya.

     Kalau keduanya berbeda soal isi episode, YANG INI yang menang.
     Tafsirnya hidup di ../naskah.md § Peta seri. -->

# Neural Networks — From Zero to Understanding AI
## 15-Episode / 30-Second Animation + VO Direction Master Plan

**Version:** 1.0  
**Format:** 9:16 vertical, 1080×1920  
**Duration:** 30 seconds per episode  
**FPS target:** 30

## Global direction

- One Short = one core idea.
- Hook within the first 3 seconds.
- VO explains; animation makes the explanation visible; on-screen text reinforces it.
- Avoid unexplained jargon.
- Use one visual focal point at a time.
- Keep critical titles, labels, equations, diagrams, faces, and focal objects inside the project's Shorts safe zone.
- Protect the right-side and lower platform-UI areas.
- Camera motion must guide attention, not create decoration.
- Use consistent visual vocabulary across the series: nodes, connections, signal pulses, arrows, labels, loops, comparison panels, tokens, and clean diagrams.
- Do not invent additional story elements when giving these directions to another AI.
- For Remotion, implement each scene as reusable components and lock exact frame boundaries after final VO timing is approved.
- Technical simplifications are intentional for beginner education; do not present them as complete descriptions of production AI systems.

## Standard timing

**0:00–0:03** Hook  
**0:03–0:07/0:08** Setup  
**0:07/0:08–0:17** Core explanation  
**0:17–0:24** Example / reveal  
**0:24–0:28** Takeaway  
**0:28–0:30** Next episode / conclusion

## Scene fields

Every scene should specify:
- Timecode
- Purpose
- Exact VO
- VO delivery direction
- Starting visual state
- Animation actions
- Camera direction
- On-screen text
- Safe-zone check
- Transition


# Episode 01 — How Does AI Actually Learn?

**Learning objective:** Prediction → error → adjustment → repetition.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “How does AI actually learn?” Delivery: curious and direct. Animation: neural-network nodes rapidly appear and connect; one signal pulse travels through the network. Text: HOW DOES AI LEARN?

0:03–0:07 SETUP — VO: “It doesn't start by knowing the answer.” Delivery: calm; emphasize “doesn't start.” Animation: input enters a simple network and produces a visibly wrong output. Text: WRONG PREDICTION.

0:07–0:17 CORE — VO: “It makes a prediction, checks how wrong it was, and adjusts itself.” Delivery: three distinct beats. Animation: signal travels → output compares with target → connections subtly change. Text beats: PREDICT → ERROR → ADJUST.

0:17–0:24 REVEAL — VO: “Repeat that process again and again, and the network gradually learns patterns.” Delivery: more energy on “again and again,” slower on “learns patterns.” Animation: loop repeats and prediction becomes more accurate. Text: LEARN PATTERNS.

0:24–0:28 TAKEAWAY — VO: “That's the basic idea behind neural network learning.” Animation: GUESS → ERROR → ADJUST → LEARN.

0:28–0:30 NEXT — VO: “Next: what is the neuron actually doing?” Animation: zoom into one neuron. Text: NEXT: THE ARTIFICIAL NEURON.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 02 — How Does One Artificial Neuron Work?

**Learning objective:** Inputs are weighted, combined with a bias, and transformed into an output.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “What is a single artificial neuron actually doing?” Animation: zoom from a network into one node. Text: ONE ARTIFICIAL NEURON.

0:03–0:08 INPUTS — VO: “It takes several inputs and gives each one a different importance.” Animation: three signals arrive with w1, w2, w3; connection strength visibly differs. Text: INPUTS + WEIGHTS.

0:08–0:17 CORE — VO: “It combines those weighted inputs, adds a bias, and calculates a value.” Animation: inputs converge into Σ; bias enters; result appears. Text: WEIGHTED SUM + BIAS.

0:17–0:24 OUTPUT — VO: “That value becomes the neuron's output.” Animation: output pulse leaves toward the next layer. Text: OUTPUT.

0:24–0:28 TAKEAWAY — VO: “So a neuron is basically a tiny calculation unit.” Animation: INPUTS → CALCULATION → OUTPUT.

0:28–0:30 NEXT — VO: “But who decides those weights?” Animation: zoom onto connection weights. Text: NEXT: WEIGHTS.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 03 — What Are Weights and Biases?

**Learning objective:** Weights control influence; bias shifts the neuron's result.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “Why does a neural network need weights?” Animation: connections appear with different strengths. Text: WHY WEIGHTS?

0:03–0:08 WEIGHTS — VO: “A weight controls how strongly an input influences a neuron.” Animation: strong, medium, and weak connections; signal intensity follows strength. Text: INFLUENCE.

0:08–0:16 BIAS — VO: “A bias gives the neuron an adjustable starting point.” Animation: number line shifts as bias changes. Text: BIAS = OFFSET.

0:16–0:23 LEARNING — VO: “During training, the network changes these values to improve its predictions.” Animation: weights change after an error; next prediction improves. Text: LEARNED VALUES.

0:23–0:28 TAKEAWAY — VO: “Weights control influence. Bias shifts the result.” Animation: WEIGHT → INFLUENCE; BIAS → SHIFT.

0:28–0:30 NEXT — VO: “But a weighted sum alone isn't enough.” Animation: neuron pauses before output; activation symbol appears. Text: NEXT: ACTIVATION.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 04 — Why Does AI Need Activation Functions?

**Learning objective:** Activation functions add nonlinearity so layers can model complex patterns.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “Why can't a neural network just add numbers?” Animation: simple neuron produces a straight-line result. Text: JUST ADD NUMBERS?

0:03–0:08 LIMIT — VO: “Because repeated simple sums would still behave like one simple rule.” Animation: multiple linear layers visually collapse to one straight line. Text: TOO SIMPLE.

0:08–0:17 ACTIVATION — VO: “An activation function transforms the result and adds useful nonlinearity.” Animation: line passes through an activation curve and changes shape. Text: ACTIVATION.

0:17–0:24 EXAMPLE — VO: “That lets layers build much more complicated patterns.” Animation: simple boundary becomes increasingly complex through layers. Text: COMPLEX PATTERNS.

0:24–0:28 TAKEAWAY — VO: “Activation functions help neural networks go beyond straight lines.” Animation: straight line morphs into a complex boundary.

0:28–0:30 NEXT — VO: “So why do we stack neurons into layers?” Text: NEXT: LAYERS.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 05 — Why Does a Neural Network Need Layers?

**Learning objective:** Layers progressively transform simple features into useful representations.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “Why not build an AI with just one layer?” Animation: one layer attempts a complex classification and fails. Text: ONE LAYER?

0:03–0:08 FEATURES — VO: “Early layers can detect simple patterns.” Animation: image breaks into edges, lines, and simple shapes. Text: SIMPLE FEATURES.

0:08–0:16 DEEPER FEATURES — VO: “Later layers combine those patterns into more useful features.” Animation: edges combine into shapes; shapes into parts. Text: COMBINE FEATURES.

0:16–0:23 OUTPUT — VO: “Eventually, the network can use those features to make a prediction.” Animation: parts combine into recognizable object/category. Text: PREDICTION.

0:23–0:28 TAKEAWAY — VO: “Layers let the network build understanding step by step.” Animation: SIMPLE → COMBINED → COMPLEX.

0:28–0:30 NEXT — VO: “Now let's watch information move through those layers.” Text: NEXT: FORWARD PROPAGATION.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 06 — How Does Information Move Through a Neural Network?

**Learning objective:** Forward propagation moves information from input through layers to an output.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “What happens when you give a neural network an input?” Animation: input values appear and the network activates. Text: WHAT HAPPENS NEXT?

0:03–0:08 INPUT — VO: “The input enters the first layer.” Animation: values travel into first nodes. Text: INPUT.

0:08–0:16 FORWARD PASS — VO: “Each neuron calculates a value and passes it to the next layer.” Animation: signals propagate left to right, layer by layer. Text: FORWARD.

0:16–0:23 OUTPUT — VO: “The final layer turns all of that processing into a prediction.” Animation: signals converge; output probabilities appear. Text: OUTPUT / PREDICTION.

0:23–0:28 TAKEAWAY — VO: “That trip from input to output is called forward propagation.” Animation: clean arrow spans the network. Text: FORWARD PROPAGATION.

0:28–0:30 NEXT — VO: “But how does the network know if it was wrong?” Text: NEXT: ERROR.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 07 — How Does AI Know It Is Wrong?

**Learning objective:** Loss measures how far a prediction is from the target.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “AI made a prediction. But how does it know it was wrong?” Animation: prediction and target appear side by side. Text: HOW WRONG?

0:03–0:08 COMPARE — VO: “We compare its prediction with the correct answer.” Animation: predicted 0.2 vs target 1.0; difference highlighted. Text: PREDICTION vs TARGET.

0:08–0:16 LOSS — VO: “A loss function turns that difference into a number.” Animation: difference becomes a loss score. Text: LOSS.

0:16–0:23 MEANING — VO: “A larger loss means the prediction is farther from what we wanted.” Animation: small and large errors map to small and large loss values. Text: BIGGER LOSS = WORSE.

0:23–0:28 TAKEAWAY — VO: “Loss gives training a way to measure mistakes.” Animation: loss meter settles.

0:28–0:30 NEXT — VO: “Now the network needs to figure out what to change.” Text: NEXT: BACKPROPAGATION.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 08 — How Does AI Learn From Its Mistakes?

**Learning objective:** Backpropagation sends error information backward to determine how parameters affected loss.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “Knowing the mistake isn't enough. What should the network change?” Animation: loss score appears and network freezes. Text: WHAT SHOULD CHANGE?

0:03–0:08 REVERSE — VO: “Backpropagation sends information about the error backward through the network.” Animation: error signal travels from output toward earlier layers. Text: BACKPROPAGATION.

0:08–0:17 RESPONSIBILITY — VO: “It helps determine how much each parameter contributed to the mistake.” Animation: individual connections highlight with different contribution indicators. Text: CONTRIBUTION.

0:17–0:24 UPDATE PREP — VO: “Those signals tell the optimizer which direction can reduce the loss.” Animation: parameter-change arrows point toward lower loss. Text: REDUCE LOSS.

0:24–0:28 TAKEAWAY — VO: “Backpropagation tells the network where to adjust.” Animation: backward arrows become adjustment markers.

0:28–0:30 NEXT — VO: “But how big should each adjustment be?” Text: NEXT: GRADIENT DESCENT.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 09 — How Does Gradient Descent Improve AI?

**Learning objective:** Gradient descent repeatedly changes parameters in a direction that reduces loss.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “How does AI decide which way to improve?” Animation: parameter represented by a ball on a loss landscape. Text: WHICH WAY?

0:03–0:08 LANDSCAPE — VO: “Imagine loss as a landscape with high and low points.” Animation: ball appears high on a curved surface. Text: LOSS LANDSCAPE.

0:08–0:16 DESCENT — VO: “The gradient points toward the direction of steepest increase, so we move the other way.” Animation: gradient arrow points uphill; movement arrow points downhill. Text: MOVE DOWNHILL.

0:16–0:23 ITERATE — VO: “Small steps repeated over and over can bring the loss down.” Animation: ball takes several small steps toward a valley. Text: SMALL STEPS.

0:23–0:28 TAKEAWAY — VO: “That basic idea is gradient descent.” Animation: valley receives the label GRADIENT DESCENT.

0:28–0:30 NEXT — VO: “Put it all together, and you get training.” Text: NEXT: TRAINING.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 10 — What Actually Happens When AI Trains?

**Learning objective:** Combine forward pass, loss, backpropagation, and parameter updates into one training loop.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “So what actually happens during AI training?” Animation: four empty stages appear. Text: AI TRAINING.

0:03–0:08 FORWARD — VO: “First, the network makes a prediction.” Animation: input travels forward. Text: 1 PREDICT.

0:08–0:13 LOSS — VO: “Then it measures the error.” Animation: prediction compared with target; loss score appears. Text: 2 MEASURE.

0:13–0:18 BACKPROP — VO: “Next, backpropagation traces how the parameters affected that error.” Animation: error signal travels backward. Text: 3 BACKPROPAGATE.

0:18–0:24 UPDATE — VO: “Finally, the parameters are adjusted, and the cycle starts again.” Animation: weights update; loop arrow completes. Text: 4 UPDATE.

0:24–0:28 TAKEAWAY — VO: “Training is this loop repeated across many examples.” Animation: example cards cycle through the loop.

0:28–0:30 NEXT — VO: “But repeating training can create a new problem.” Text: NEXT: OVERFITTING.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 11 — Can AI Memorize Instead of Learn?

**Learning objective:** Overfitting occurs when a model fits training examples too specifically and generalizes poorly.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “Can AI look smart just because it memorized the examples?” Animation: familiar examples get perfect predictions. Text: MEMORIZE OR LEARN?

0:03–0:08 TRAINING — VO: “A model can become extremely good at its training data.” Animation: training examples reach near-perfect accuracy. Text: TRAINING DATA.

0:08–0:16 PROBLEM — VO: “But when it sees something new, it can fail.” Animation: new example arrives and prediction is wrong. Text: NEW DATA.

0:16–0:23 OVERFITTING — VO: “That's overfitting: learning the examples too specifically instead of generalizing the pattern.” Animation: decision boundary twists around training points and fails on new points. Text: OVERFITTING.

0:23–0:28 TAKEAWAY — VO: “Good learning means working beyond the examples you saw.” Animation: boundary simplifies into a general pattern.

0:28–0:30 NEXT — VO: “Now, what if the data is an image?” Text: NEXT: CNNs.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 12 — How Do Neural Networks Understand Images?

**Learning objective:** CNNs use local filters and layered features to build increasingly meaningful visual representations.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “How can a neural network make sense of a picture?” Animation: image enters a pixel grid. Text: HOW DOES AI SEE?

0:03–0:08 LOCAL FEATURES — VO: “Instead of treating every pixel as a complete idea, a convolution looks at local regions.” Animation: small window scans across the image. Text: LOCAL FEATURES.

0:08–0:16 FILTER — VO: “Different filters can respond to edges, textures, and other visual patterns.” Animation: filters create edge and texture feature maps. Text: EDGES / TEXTURES.

0:16–0:23 HIERARCHY — VO: “Deeper layers combine those simple features into more meaningful shapes.” Animation: feature maps transform into shapes and object parts. Text: FEATURES → PARTS.

0:23–0:28 TAKEAWAY — VO: “That idea is central to convolutional neural networks.” Animation: CNN label appears over the feature hierarchy.

0:28–0:30 NEXT — VO: “But images aren't the only kind of data.” Text: NEXT: SEQUENCES.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 13 — How Does AI Handle Sequences?

**Learning objective:** Sequence models account for order and context across steps.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “Why does the order of information matter to AI?” Animation: same words appear in different orders. Text: ORDER MATTERS.

0:03–0:08 SEQUENCE — VO: “In a sequence, earlier information can change how we interpret what comes next.” Animation: context signal flows left to right. Text: CONTEXT.

0:08–0:16 MEMORY IDEA — VO: “Sequence models use mechanisms that carry useful information across steps.” Animation: context state moves along a timeline. Text: CONTEXT OVER TIME.

0:16–0:23 EXAMPLES — VO: “That matters for language, speech, time series, and many other ordered signals.” Animation: text, waveform, and chart feed into one sequence model. Text: LANGUAGE / SPEECH / TIME.

0:23–0:28 TAKEAWAY — VO: “For sequences, what came before can matter.” Animation: earlier tokens highlight when a later token is processed.

0:28–0:30 NEXT — VO: “Transformers changed this idea dramatically.” Text: NEXT: TRANSFORMERS.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 14 — How Do Transformers Understand Language?

**Learning objective:** Attention lets tokens use different amounts of information from other tokens in context.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “How can AI decide which words matter to each other?” Animation: sentence tokens appear separately. Text: WHICH WORDS MATTER?

0:03–0:08 TOKENS — VO: “A transformer breaks text into tokens and processes relationships between them.” Animation: sentence splits into tokens; connections appear. Text: TOKENS.

0:08–0:17 ATTENTION — VO: “Attention lets a token assign different amounts of focus to other tokens.” Animation: one token highlights; relevant links brighten more strongly. Text: ATTENTION.

0:17–0:24 CONTEXT — VO: “That helps the model use context from across the sequence.” Animation: attention lines span multiple tokens; context combines. Text: CONTEXT.

0:24–0:28 TAKEAWAY — VO: “Transformers are built around powerful ways of relating information.” Animation: token relationships resolve into a transformer block.

0:28–0:30 NEXT — VO: “And that's a big part of how modern language AI works.” Text: NEXT: CHATGPT.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Episode 15 — How Does This Connect to ChatGPT?

**Learning objective:** Connect the series concepts to modern language AI while making clear the simplified series is only the foundation.

## Scene-by-scene direction

0:00–0:03 HOOK — VO: “So where does all of this show up in ChatGPT?” Animation: neural-network motifs transition into a language interface. Text: WHERE DOES THIS SHOW UP?

0:03–0:08 FOUNDATION — VO: “ChatGPT is built on neural-network technology, including transformer architectures.” Animation: transformer blocks assemble behind the language interface. Text: NEURAL NETWORKS + TRANSFORMERS.

0:08–0:17 LEARNING — VO: “The same broad ideas we explored—parameters, training, loss, and optimization—are part of the bigger picture.” Animation: WEIGHTS → LOSS → BACKPROP → OPTIMIZATION connect.

0:17–0:24 LANGUAGE — VO: “Transformers use attention and learned representations to process language.” Animation: tokens connect through attention; representations flow toward prediction. Text: ATTENTION + REPRESENTATIONS.

0:24–0:28 TAKEAWAY — VO: “So the simple neuron was the beginning of a much bigger story.” Animation: one neuron expands into a large network and transformer architecture.

0:28–0:30 SERIES END — VO: “And now you know the basic map.” Delivery: warm and confident. Animation: the 15 concepts appear briefly as a connected path. Text: NEURAL NETWORKS — FROM ZERO TO UNDERSTANDING AI.

## Safe-zone check
Critical text and visual information must remain inside the central safe area for the entire animation, including during camera movement and transitions. Keep essential information away from the right-side controls and lower interaction area.

## Remotion implementation
Use reusable components rather than one-off drawings. Suggested components: `Network`, `Neuron`, `Connection`, `Signal`, `Label`, `Pill`, `FlowArrow`, `Comparison`, `FeatureMap`, `Token`, `AttentionLink`, and `SafeZoneOverlay`. Final scene boundaries should be synchronized to the approved VO recording.

---


# Master QA Checklist

### VO
- [ ] Exact script approved.
- [ ] Fits the 30-second target naturally.
- [ ] Technical terms are clear.
- [ ] Emphasis and pauses align with visual beats.
- [ ] No unnecessary filler.

### Animation
- [ ] Every important VO idea has a matching visual.
- [ ] Important state changes happen at the correct narration moment.
- [ ] No decorative motion competes with the explanation.
- [ ] Camera movement is purposeful.
- [ ] Transitions preserve continuity.

### Educational clarity
- [ ] One core concept dominates.
- [ ] No unexplained jargon.
- [ ] Visual metaphors do not contradict the concept.
- [ ] Simplifications are not misleading.
- [ ] Takeaway is memorable after one viewing.

### Safe zone
- [ ] Critical content remains safe throughout motion.
- [ ] Right-side UI area is protected.
- [ ] Bottom UI area is protected.
- [ ] Text is readable on a phone.
- [ ] Final frame is safe.

### Series continuity
- [ ] Same visual language.
- [ ] Same terminology.
- [ ] Consistent 30-second rhythm.
- [ ] Each episode can stand alone.
- [ ] Next-episode connection is accurate.

## Production workflow

1. Approve title and learning objective.
2. Record/generate VO.
3. Measure final VO timing.
4. Adjust scene boundaries to the real VO.
5. Build/adjust Remotion animation.
6. Run safe-zone review.
7. Render 1080×1920.
8. Review once with audio and once muted.
9. Check at phone-size viewing.
10. Export final Short.
