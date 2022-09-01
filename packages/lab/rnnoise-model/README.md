# ffmpeg rnnoise models

## Models

- `general.rnnn`

  General use in a noisy recording environment.

- `general-record.rnnn`

  General use in a reasonable recording environment. Fans, AC, computers, etc.

- `voice.rnnn`

  Voice in a noisy recording environment.

- `voice-record.rnnn`

  Voice in a reasonable recording environment. Fans, AC, computers, etc.

- `speech-record.rnnn`

  Speech in a reasonable recording environment. Fans, AC, computers, etc.
  Note that "speech" means speech, not other human sounds; laughter, coughing, etc are not included.

## How to use

`ffmpeg -i input.mp3 -c:a aac -q:a 1 -af arnndn=m=./general-record.rnnn -strict experimental output.mp4`
