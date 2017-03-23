import React, { Component } from 'react';
import {
    View, Text, TouchableHighlight, ScrollView, Alert
} from 'react-native';
import Color from 'color';

export default class Favourites extends Component {
    constructor(props){
        super(props);
    }

    handleAlert = (color) => {
        const {handleRemove} = this.props;

        Alert.alert('Remove color', 'Should i remove this color?', [
            {text: 'Yes', onPress: () => handleRemove(color)},
            {text: 'No', onPress: () => {}}
        ])
    }

    render() {
        const {handleSet, favourites, handleRemove} = this.props;
        return (
            <View style={styles.container, styles.distance}>
                <Text style={[styles.container, styles.title]}>Favourites</Text>
                {favourites && favourites.length > 0 ?
                    <ScrollView horizontal={true} style={[styles.container, styles.distance]}>
                        {favourites.map((item, index) =>
                            <TouchableHighlight
                                onPress={() => handleSet([item])}
                                onLongPress={() => this.handleAlert(item)}
                                key={index}
                            >
                                <View style={[styles.singleColor, {backgroundColor: Color(item).rgb().string()}]} >

                                </View>
                            </TouchableHighlight>
                        )}
                    </ScrollView> :
                    <Text style={[styles.container, styles.subtitle]}>There are no favourite colors</Text>
                }
            </View>
        )
    }
}
