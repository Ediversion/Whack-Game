import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import Square from './Square.js'
import { connect } from 'react-redux'

const image = { uri: "../assets/background.png" }

const GameBoard = (props) => {
    // Storing state to use it in this entire file
    const [timeLeft, setTimeLeft] = useState(60)

    useEffect(() => {
        if (!timeLeft) return
        const timerId = setInterval(() => {
            // happens every 1000ms
            setTimeLeft(timeLeft - 1)
        }, 1000)
        return () => clearInterval(timerId)
    }, [timeLeft])

    return (
        <ImageBackground style={styles.container} source={require('../assets/background.png')}>
            <Text style={styles.header}>Edison's Game App</Text>
            <Text>You Have {timeLeft} seconds left</Text>
            <Text>{props.score}</Text>
            <View style={styles.game}>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
                <Square></Square>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 50,
    },
    game: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 300,
        paddingTop: 20,
    },
    header: {
        fontWeight: 'bold',
        marginTop: 100,
        marginBottom: 15
    }
});

const mapStateToProps = state => {
    return {
        score: state.score
    }
}


export default connect(mapStateToProps)(GameBoard)