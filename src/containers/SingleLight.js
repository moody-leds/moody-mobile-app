import React, { Component } from 'react';
import {
    View, ScrollView, Text, Navigator, AsyncStorage
} from 'react-native';
import update from 'react-addons-update';

import Color from 'color';
import Palette from '../components/Palette';
import ColorPicker from '../components/ColorPicker';
import Favourites from '../components/Favourites';

export default class SingleLight extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favourites: []
        }
    }

    componentDidMount() {
        this.fetchStorage();
    }

    fetchStorage = () => {
        AsyncStorage.getItem('favourites').then(value => {
            if(value) {
                this.setState(Object.assign({}, this.state, {
                    favourites: JSON.parse(value)
                }))
            }
        }).done();
    }

    handleSetFavourite = (color) => {
        this.setState(update(this.state, {
            favourites: {$push: color}
        }), () => {
            AsyncStorage.setItem('favourites', JSON.stringify(this.state.favourites));
        });
    }

    handleRemove = (color) => {
        const {favourites} = this.state;

        this.setState(update(this.state, {
            favourites: {$splice: [[favourites.indexOf(color), 1]]}
        }), () => {
            AsyncStorage.setItem('favourites', JSON.stringify(this.state.favourites));
        });
    }

    render() {
        const {item, handleSet} = this.props;
        const {favourites} = this.state;
        const palettes = [
            ['#C4DDD6','#D4DDD6','#E4DDD6','#E4E3CD','#ECECDD'],
            ['#556270','#4ECDC4','#C7F464','#FF6B6B','#C44D58'],
            ['#D9CEB2','#948C75','#D5DED9','#7A6A53','#99B2B7'],
            ['#EFAC41','#DE8531','#B32900','#6C1305','#330A04']
        ]
        return (
            <ScrollView style={[styles.container]}>
                <Favourites
                    handleSet={handleSet}
                    favourites={favourites}
                    handleRemove={this.handleRemove}
                />
                <ColorPicker
                    item={item}
                    handleSet={handleSet}
                    handleSave={this.handleSetFavourite}
                />
                {
                    // <View style={styles.singleView}>
                    //     <Text style={styles.title}>Palettes</Text>
                    //
                    //     {palettes && palettes.map((item, id) => <Palette
                    //         colors={item}
                    //         key={id}
                    //         handleSet={this.handleSet}
                    //     />)}
                    //
                    // </View>
                }
            </ScrollView>
        )
    }
}
