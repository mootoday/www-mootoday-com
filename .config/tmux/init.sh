# #!/bin/bash
export TMUX_SESSION=$(basename $(pwd))
export TERMINAL_COLS=$(tput cols)
export TERMINAL_LINES=$(tput lines)

tmux  -f ./.config/tmux/tmux.conf attach
