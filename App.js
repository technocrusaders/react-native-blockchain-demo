import SHA256 from 'crypto-js/sha256'
import {RaisedTextButton} from 'react-native-material-buttons';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native'
import Block from './block.js'
import map from 'lodash/map'

const genesisPayLoad = '100';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

    getHash = (index, previousHash, payLoad) =>
        SHA256(index + previousHash + payLoad).toString();

    state = {
        blocks: [{
            payLoad: genesisPayLoad,
            hash: this.getHash(0, '0', genesisPayLoad),
            previousHash: '0',
            index: 0,
            isValid: true
        }],
        isInstructionsShown: true
    };

    render = () =>
        <View>
            {this.state.isInstructionsShown ? this.renderInstructions() : null}

            <RaisedTextButton onPress={this.changeInstructionVisibility}
                              title={this.getInstructionTitle()}/>

            <RaisedTextButton onPress={this.addBlock}
                              title='Add'/>

            <RaisedTextButton onPress={this.removeBlock}
                              title='Remove Last'/>

            <RaisedTextButton onPress={this.validateChain}
                              title='Validate Chain'/>

            <ScrollView style={style.blockContainer}>
                {map(this.state.blocks, this.renderBlock)}
            </ScrollView>

        </View>;

    renderBlock = ({hash, previousHash, payLoad, isValid}, index) =>
        <Block number={index}
               updateHash={(newHash) => this.updateHash(index, newHash)}
               updatePreviousHash={(newPreviousHash) => this.updatePreviousHash(index, newPreviousHash)}
               updatePayLoad={(newPayLoad) => this.updatePayLoad(index, newPayLoad)}
               key={index}
               hash={hash}
               payLoad={payLoad}
               previousHash={previousHash}
               isValid={isValid}
        />;

    renderInstructions = () =>
        <Text style={style.welcome}>
            Nicks Block Chain Demo.
            1. Add a few blocks
            2. Edit any of the information
            3. Press ok.
            4. Press Validate Chain
            5. Results in any invalid blocks getting a red
            background.
            Note: This is work in progress...
        </Text>;

    changeInstructionVisibility = () =>
        this.setState({isInstructionsShown: !this.state.isInstructionsShown});

    getInstructionTitle = () =>
        this.state.isInstructionsShown ? 'Hide instructions' : 'Show instructions';

    addBlock = () => {
        const blocks = this.state.blocks;
        blocks.push(this.getBlock());
        this.setState({blocks})
    };

    getBlock = () => {
        const lastBlock = this.getLastBlock();
        const suffix = Math.floor(Math.random() * 100);
        const payLoad = lastBlock.payLoad + suffix;
        const previousHash = lastBlock.hash;
        const index = this.state.blocks.length;

        return {
            payLoad,
            hash: this.getHash(index, previousHash, payLoad),
            previousHash,
            index,
            isValid: true
        }
    };

    getLastBlock = () =>
        this.state.blocks[this.state.blocks.length - 1];

    removeBlock = () => {
        let blocks = this.state.blocks;
        if (blocks.length > 1) {
            blocks.pop();
        }
        this.setState({blocks})
    };

    updateHash = (index, hash) => {
        let blocks = this.state.blocks;
        blocks[index].hash = hash;
        this.setState({blocks})
    };

    updatePreviousHash = (index, previousHash) => {
        let blocks = this.state.blocks;
        blocks[index].previousHash = previousHash;
        this.setState({blocks})
    };

    updatePayLoad = (index, payLoad) => {
        let blocks = this.state.blocks;
        blocks[index].payLoad = payLoad;
        this.setState({blocks})
    };

    validateChain = () => {
        const blocks = this.state.blocks;

        for (let i = 0; i < blocks.length; i++) {
            const currentBlock = blocks[i];

            if (i === 0) {
                blocks[0].isValid = this.isHashSame(blocks[0]);
                continue
            }

            const {hash} = blocks [i - 1];

            currentBlock.isValid = this.isHashSame(currentBlock) ?
                (currentBlock.previousHash === hash) : false
        }
        this.setState({blocks})
    };

    isHashSame = ({hash, index, previousHash, payLoad}) =>
        (hash === this.getHash(index, previousHash, payLoad));

}

const style = StyleSheet.create({
    blockContainer: {
        height: 500
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});
