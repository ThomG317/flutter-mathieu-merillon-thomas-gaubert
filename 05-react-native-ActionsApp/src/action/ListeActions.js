import React from 'react'
import {View} from 'react-native'
import {UneAction} from './UneAction'


export const ListeActions = ({ actions , completeAction, deleteAction}) => {

    return (
        <View>
            {actions.map((action, index) =>
                <UneAction action={action}
                           completeAction={completeAction(index)}
                           deleteAction={deleteAction(index)} key={index}/>
            )}
        </View>
    )
}
