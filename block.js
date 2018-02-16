import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, TextInput, View, Text} from 'react-native'
import {RaisedTextButton} from 'react-native-material-buttons'

export default class Block extends React.Component {

    static propTypes = {
        payLoad: PropTypes.string,
        hash: PropTypes.string,
        previousHash: PropTypes.string,
        number: PropTypes.number,
        updatePayLoad: PropTypes.func,
        updateHash: PropTypes.func,
        updatePreviousHash: PropTypes.func,
        isValid: PropTypes.bool
    };

    state = {
        isEditMode: false
    };

    render = () =>
        this.state.isEditMode ?
            this.renderEditMode() :
            this.renderViewMode();

    renderViewMode = () =>
        <View style={this.props.isValid ? style.block : style.badBlock}>
            <Text style={style.blockLabel}>
                #: {this.props.number}
            </Text>
            <Text style={style.blockLabel}>
                Payload: {this.props.payLoad}
            </Text>
            <Text style={style.blockLabel}>
                Hash: value={this.props.hash}
            </Text>
            <Text style={style.blockLabel}>
                Previous Hash : {this.props.previousHash}
            </Text>

            <RaisedTextButton title='Edit'
                              onPress={() => this.setState({isEditMode: true})}>
            </RaisedTextButton>
        </View>;

    renderEditMode = () =>
        <View style={style.view}>
            <Text style={style.blockLabel}>
                #: {this.props.number}
            </Text>

            <Text style={style.blockLabel}>
                Payload
            </Text>
            <TextInput style={style.textInput}
                       value={this.props.payLoad}
                       onChangeText={this.props.updatePayLoad}/>

            <Text style={style.blockLabel}>
                Hash
            </Text>
            <TextInput style={style.textInput}
                       value={this.props.hash}
                       onChangeText={this.props.updateHash}/>

            <Text style={style.blockLabel}>
                Previous Hash
            </Text>
            <TextInput style={style.textInput}
                       value={this.props.previousHash}
                       onChangeText={this.props.updatePreviousHash}/>

            <RaisedTextButton title={'Ok'}
                              onPress={() => this.setState({isEditMode: false})}>
            </RaisedTextButton>
        </View>
}

const style = StyleSheet.create({
    block: {
        backgroundColor: '#7ec1ec',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da'

    },
    badBlock: {
        backgroundColor: '#ebacaf',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da'

    },
    blockLabel: {
        fontSize: 16,
        textAlign: 'left',
        margin: 2,
    },
    textInput: {
        backgroundColor: 'white',
        fontSize: 16
    },
    view: {
        backgroundColor: '#9eff89'
    }
});
