import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleSendEmail = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, digite seu e-mail');
      return;
    }
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido');
      return;
    }
    
    Alert.alert(
      'E-mail enviado', 
      'Enviamos um link para redefinir sua senha para o e-mail informado.',
      [
        { text: 'OK', onPress: () => router.back() }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Recuperar Senha</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Image 
                source={require("@/assets/images/logo2.jpeg")} 
                style={styles.logoImage} 
              />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>
            Esqueceu sua senha?
          </Text>

          {/* Description */}
          <Text style={styles.description}>
            Digite seu e-mail abaixo e enviaremos um link para redefinir sua senha.
          </Text>

          {/* Input Field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Send Button */}
          <TouchableOpacity style={styles.sendButton} onPress={handleSendEmail}>
            <Text style={styles.sendButtonText}>Enviar Link</Text>
          </TouchableOpacity>

          {/* Back to Login Link */}
          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.linkText}>Voltar ao login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#20B2AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  sendButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#20B2AA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linksContainer: {
    alignItems: 'center',
  },
  linkText: {
    color: '#333',
    fontSize: 14,
    textDecorationLine: 'none',
  },
});
