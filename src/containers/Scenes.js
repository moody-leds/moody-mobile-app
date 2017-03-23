import React, { Component } from 'react';
import {
    View, Text, Navigator, StyleSheet, ListView, TouchableHighlight, TabBarIOS
} from 'react-native';

import SingleLight from './SingleLight';

export default class Scenes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.genRows([])
        };
    }

    genRows = (rows) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return ds.cloneWithRows(rows);
    }

    handlePressRow = (light) => {
        this.props.navigator.push({
            component: SingleLight,
            passProps: {
                socket: this.props.socket,
                item: light
            },
            title: light.name
        })
    }

    renderRow = (rowData) => {
        return (
            <TouchableHighlight
                onPress={() => this.handlePressRow(rowData)}
            >
                <View style={styles.listRow}>
                    <Text style={styles.listRowText}>
                        {rowData.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    renderSeparator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={rowID}
                style={styles.separator}
            />
        )
    }

    render() {

        return (

            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={rowData => this.renderRow(rowData)}
                    renderSeparator={this.renderSeparator}
                />
            </View>


        )
    }
}
