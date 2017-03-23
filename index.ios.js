import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    NavigatorIOS,
    StatusBar,
    TabBarIOS,
    Text,
    AsyncStorage
} from 'react-native';

import Lights from './src/containers/Lights';
import Scenes from './src/containers/Scenes';
import io from 'socket.io-client';

import config from './src/config.js';
import styles from './src/styles/styles.js';
import icons from './src/styles/icons.js';


export default class Moody extends Component {
    constructor () {
        super();

        this.state = {
            tab: 0
        }

    }

    toggleTab = (selected) => {
        this.setState(Object.assign(this.state, {}, {
            tab: selected
        }))
    }

    render() {
        const socket = io.connect(config.SERVER_URI, {reconnect: true});

        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor="black"
                    barStyle="light-content"
                />

                <TabBarIOS
                    unselectedTintColor="grey"
                    tintColor="white"
                    barTintColor="#000"
                    style={styles.container}

                >
                    <TabBarIOS.Item
                        title="Lights"
                        icon={{uri: icons.bulb, scale: 4}}
                        selected={this.state.tab === 0}
                        onPress={() => this.toggleTab(0)}
                    >
                        <NavigatorIOS
                            initialRoute={{
                                component: Lights,
                                title: "Lights",
                                passProps: {
                                    socket: socket
                                }
                            }}
                            translucent={false}
                            style={[styles.container]}
                            barTintColor='#000'
                            titleTextColor='#fff'
                            tintColor='#fff'
                        />
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        title="Scenes"
                        icon={{uri: icons.scenes, scale: 4}}
                        selected={this.state.tab === 1}
                        onPress={() => this.toggleTab(1)}
                    >
                        <NavigatorIOS
                            initialRoute={{
                                component: Scenes,
                                title: "Scenes",
                                passProps: {
                                    socket: socket
                                }
                            }}
                            translucent={false}
                            style={[styles.container]}
                            barTintColor='#000'
                            titleTextColor='#fff'
                            tintColor='#fff'
                        />
                    </TabBarIOS.Item>
                </TabBarIOS>
            </View>
        );
    }
}

AppRegistry.registerComponent('Moody', () => Moody);
