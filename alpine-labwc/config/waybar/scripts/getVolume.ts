#!/usr/local/bin/deno-shebang

const output  = {
    text: '',
    tooltip: '0%',
};

try {
    const getVolume = new Deno.Command('wpctl', {
        args: ['get-volume', '@DEFAULT_AUDIO_SINK@']
    });
    const { code, stdout } = await getVolume.output();
    if (code !== 0) {
        throw new Error('Non-zero exit code!');
    }
    const volume_pieces = new TextDecoder().decode(stdout).trim().split(' ');
    for (const [index, value] of volume_pieces.entries()) {
        switch (index) {
            case 1: {
                const percentageDecimal = parseFloat(value);
                output.tooltip = `${Math.round(percentageDecimal * 100)}%`;
                if (percentageDecimal < 0.33) {
                    output.text = ''
                } else if (percentageDecimal < 0.66) {
                    output.text = ''
                } else {
                    output.text = ''
                }
                break;
            }
            case 2: {
                //output.muted = value === '[MUTED]';
                if (value === '[MUTED]') {
                    output.text = '󰝟'
		    output.tooltip = `${output.tooltip} (muted)`
                }
                break;
            }
        }
    }
} catch {
    output.text = '';
}

console.log(JSON.stringify(output));
