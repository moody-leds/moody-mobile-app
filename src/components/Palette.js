import React, { Component } from 'react';
import {
    View, Text,TouchableHighlight
} from 'react-native';
import Color from 'color';

export default class Palette extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {colors, handleSet} = this.props;
        return (
            <TouchableHighlight
                onPress={() => handleSet(colors)}
            >
                <View style={styles.palette} >
                    {colors && colors.map((item, id) =>
                        <View key={id} style={[styles.paletteColor, {backgroundColor: Color(item).rgb().string()}]} />
                    )}
                </View>
            </TouchableHighlight>
        )
    }
}
