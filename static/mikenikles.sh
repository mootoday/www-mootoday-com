#!/bin/sh

echo '              ___                   ___  __  
 |\/| | |__/ |__  |\ | | |__/ |    |__  /__` 
 |  | | |  \ |___ | \| | |  \ |___ |___ .__/ 
                                             
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

echo "Web: https://www.mikenikles.com";
echo "X  : @mikenikles";
echo "";
typewriter_effect "PS: Don't run 'curl https://... | sh' for URLs you don't trust."
echo "";

