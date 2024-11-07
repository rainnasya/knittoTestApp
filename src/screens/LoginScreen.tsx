import React, { useState } from "react";
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { setToken } from "../store/authSlice";

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAttemptingLogin, setIsAttemptingLogin] = useState(false);
    const dispatch = useDispatch();

    useFocusEffect(
        React.useCallback(() =>{
            setUsername('');
            setPassword('');
            setIsAttemptingLogin(false);
            setError('');
        }, [])
    );

    const handleLogin = async () => {
        setIsAttemptingLogin(true);

        if (username === 'admin' && password === 'admin'){
            const token = '46923788-406ed719d48c8a903ab49b961';
            dispatch(setToken(token));
            navigation.replace('Home');
            setError('');
        } else {
            setError('Username atau password salah');
        }
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Login to your account</Text>
            <TextInput 
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput 
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {isAttemptingLogin && error ? <Text style={styles.error}>{error}</Text> : null}
            
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF2FB',
        justifyContent: 'center',
        padding: 18,
    },
    logo: {
        width: 280, 
        height: 280,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 8,
        
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#565D94',
        marginBottom: 24,
        textAlign: 'center',
    },
    input:{
        height:50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 10,
        borderRadius: 50, 
    },
    button: {
        backgroundColor: '#3E4685', 
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 50, 
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color:'red',
        marginTop: 12,
    }
});

export default LoginScreen;
