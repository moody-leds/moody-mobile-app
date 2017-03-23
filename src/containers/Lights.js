import React, { Component } from 'react';
import {
    View, Button, Text, Navigator, StyleSheet, ListView, TouchableHighlight, TabBarIOS
} from 'react-native';

import SingleLight from './SingleLight';

import update from 'react-addons-update';

export default class Lights extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.genRows([]),
            containers: []
        };
    }

    componentDidMount = () => {
        this.getLights();
    }

    genRows = (rows) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return ds.cloneWithRows(rows);
    }

    handleSet = (color, item) => {
        const {socket} = this.props;

        this.setState(Object.assign({}, this.state, {
            containers: this.state.containers.map(container => {
                if(container.id === item.id){
                    return Object.assign({}, container, {
                        color: color
                    })
                }else{
                    return container;
                }
            })
        }))

        socket.emit('set', {
            id: item.id,
            color: color
        });
    }

    getLights = () => {
        const io = this.props.socket;
        io.on('connect', () => {
            io.emit('init');

            io.on('initSuccess', response => {
                this.setState(update(this.state, {
                    containers: {$push: [response]}
                }), () => {
                    this.setState(Object.assign({}, this.state, {
                        dataSource: this.genRows(this.state.containers)
                    }))
                })
            })
        });
    }

    handlePressRow = (light) => {
        const {navigator, socket} = this.props;

        navigator.push({
            component: SingleLight,
            passProps: {
                socket: socket,
                handleSet: color => this.handleSet(color, light),
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
