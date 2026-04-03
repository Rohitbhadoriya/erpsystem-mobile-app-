import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS } from './constants/Color'

const AuthHeader = () => {
  return (
    <View style={styles.header}>
      <Image
        source={{ uri: '' }}
        style={styles.logo}
      />
      <Text style={styles.appName}>Coaching ERP</Text>
      <Text style={styles.tagline}>Empowering Coaches, Transforming Lives</Text>
    </View>
  )
}

export default AuthHeader

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 35
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 15
  },
  tagline: {
    fontSize: 15,
    color: COLORS.textLight,
    marginTop: 6
  }
})