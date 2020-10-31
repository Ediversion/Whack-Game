import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { addScore } from './../redux'
import { connect } from 'react-redux'

// Creating a component called Square

const Square = (props) => {
    // A component always returns an element

    // Creating a random mole to pop up in each square
    const [moleActive, setMoleActive] = useState(false)
    const [isGameOver, setGameOver] = useState(false)

    const randomTime = Math.random() * 20000
    let timerId

    useEffect(() => {
        timerId = setInterval(() => {
            setMoleActive(true)
            setTimeout(() => { setMoleActive(false) }, 800)
        }, randomTime)
        setTimeout(endGame, 60 * 1000)
    }, [])

    function endGame() {
        clearInterval(timerId)
        setGameOver(true)
    }


    return (
        // View is where we wrap our elements in its like div in html
        // If moleActive is true give it styles mole else styles square
        // TouchableOpacity allows us touch the screen
        <TouchableOpacity onPress={moleActive ? props.addScore : null}>
            <ImageBackground source={moleActive ? require('../assets/mole.png') : require('../assets/hole.png')}
                style={moleActive ? styles.mole : styles.square}>
                {isGameOver && <Text>X</Text>}
            </ImageBackground>
        </TouchableOpacity>
    )
}

// Use the StyleSheet to style things in React
const styles = StyleSheet.create({
    square: {
        flex: 1,
        minWidth: 80,
        minHeight: 80,
        margin: 10,
        backgroundColor: '#9BF89C',
        width: '100%'

    },
    mole: {
        flex: 1,
        minWidth: 80,
        minHeight: 80,
        margin: 10,
        backgroundColor: '#9BF89C',
        width: '100%'
    },
    x: {
        fontWeight: 'bold',
        fontSize: 65,
        textAlign: 'center',
    }
})

const mapStateToProps = state => {
    return {
        score: state.score
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addScore: () => dispatch(addScore())
    }
}

// To use the component in the project you have to export it
export default connect(mapStateToProps, mapDispatchToProps)(Square)