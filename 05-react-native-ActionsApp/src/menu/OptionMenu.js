import React from 'react'
import {Text, TouchableHighlight, StyleSheet} from 'react-native'

/**
 * Composant représentant une option de menu.
 *
 *
 *
 */
const OptionMenu = ({ title, selected, onPress }) => (
    <TouchableHighlight
        onPress={onPress}
        underlayColor='#efefef'
        style={[
            styles.item,
            styles.border, selected && styles.selected]}>
        <Text style={[styles.itemText, styles.bold]}>
            {title}
        </Text>

    </TouchableHighlight>
)


const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    border: {
        borderLeftWidth: 1,
        borderLeftColor: '#dddddd'
    },
    itemText: {
        color: '#777777',
        fontSize: 16
    },
    selected: {
        backgroundColor: '#ffffff'
    },
    bold: {
        fontWeight: 'bold'
    }
})
export default OptionMenu
