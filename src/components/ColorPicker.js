import React, { Component } from 'react';
import {
    View, Text, Slider, Button
} from 'react-native';
import Color from 'color';

export default class ColorPicker extends Component {
    constructor(props){
        super(props);

        this.state = {
            hue: null,
            sat: null,
            lig: null
        }
    }

    componentWillReceiveProps(props) {
        this.setColor(props.item.color);
    }

    setColor = (color) => {
        const initColor = Color(color).hsl().array();

        this.setState(Object.assign({}, this.state, {
            hue: initColor[0],
            sat: initColor[1],
            lig: initColor[2]
        }));
    }

    handleChangeSlider = (property, value) => {
        this.setState(Object.assign({}, this.state, {
            [property]: parseInt(value)
        }))
    }

    render() {
        const {colors, handleSet, handleSave} = this.props;
        const {hue, sat, lig} = this.state;

        const currColor = {
            sum: Color.hsl(hue, sat, lig).rgb().string(),
            onlyHue: Color.hsl(hue, 100, 50).rgb().string(),
            onlySat: Color.hsl(hue, sat, 50).rgb().string()
        }

        return (
            <View>
                <Text style={styles.title}>Choose color</Text>
                <View style={styles.singleView}>
                    <Text style={styles.subtitle}>Hue</Text>
                    <Slider
                        style={styles.slider}
                        value={hue}
                        minimumValue={0}
                        maximumValue={360}
                        onValueChange={(val) => this.handleChangeSlider("hue", val)}
                        minimumTrackTintColor={currColor.onlyHue}
                        maximumTrackTintColor={currColor.onlyHue}
                    />
                    <Text style={styles.subtitle}>Saturation</Text>
                    <Slider
                        style={styles.slider}
                        value={sat}
                        minimumValue={0}
                        maximumValue={100}
                        onValueChange={(val) => this.handleChangeSlider("sat", val)}
                        minimumTrackTintColor={currColor.onlySat}
                        maximumTrackTintColor={currColor.onlySat}
                    />
                    <Text style={styles.subtitle}>Lightness</Text>
                    <Slider
                        style={styles.slider}
                        value={lig}
                        minimumValue={0}
                        maximumValue={100}
                        onValueChange={(val) => this.handleChangeSlider("lig", val)}
                        minimumTrackTintColor={currColor.sum}
                        maximumTrackTintColor={currColor.sum}
                     />
                    <View style={styles.row}>
                        <Button
                            onPress={() => handleSet([Color.hsl(hue, sat, lig).hsl().string()])}
                            title="Set"
                            color="#fff"
                        />
                        <Button
                            onPress={() => handleSave([Color.hsl(hue, sat, lig).hsl().string()])}
                            title="Save as favourite"
                            color="#fff"
                        />
                    </View>
                </View>
            </View>
        )
    }
}
