import {
    StyleSheet
} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111'
    },
    separator: {
        height: 1,
        backgroundColor: '#444',
    },
    singleView: {
        padding: 20
    },
    colorExample: {
        height: 1
    },
    listRow: {
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    listRowText: {
        color: "#fff",
        fontSize: 16
    },
    slider: {
        marginVertical: 20
    },
    title: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    subtitle: {
        color: '#fff',
        textAlign: 'center'
    },
    palette: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 20
    },
    paletteColor: {
        flex: 1,
        height: 50
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    singleColor: {
        height: 70,
        width: 70,
        marginHorizontal: 5
    },
    distance: {
        paddingVertical: 20
    }
});
