#!/bin/sh

echo '       __   __  ___  __   __           
 |\/| /  \ /  \  |  /  \ |  \  /\  \ / 
 |  | \__/ \__/  |  \__/ |__/ /~~\  |  
                                             
';

typewriter_effect() {
    text="$1"
    delay=0.1

    for i in $(seq 0 $((${#text} - 1))); do
        printf "%s" "${text:$i:1}"
        sleep "$delay"
    done
    printf "\n"
}

echo "Web: https://www.mootoday.com";
echo "X  : @mootoday";
echo "";
typewriter_effect "PS: Don't run 'curl https://... | sh' for URLs you don't trust."
echo "";

