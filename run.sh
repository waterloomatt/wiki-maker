#!/bin/ash

/app/goapp &
if [[ $? != 0 ]]; then
    echo "Application failed to start."
fi

nginx -g 'daemon off;'