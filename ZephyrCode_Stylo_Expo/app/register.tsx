import { StyleSheet, Image,Text,TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { Inputtextname,Buttoncolor } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { TouchableOpacity } from 'react-native';
import {Ionicons} from "@expo/vector-icons"
import React,{ useState } from 'react';
import Checkbox from 'expo-checkbox';
import Button from '@/components/buttons';
import { Link, useRouter } from 'expo-router';
import axiosInstance from '@/constants/axiosInstance';
import { Formik, FormikProps } from 'formik'; // Import Formik and FormikProps
import * as yup from 'yup';

// Define the shape of your form values
interface FormValues {
  userName: string;
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  userName: yup.string().required('User Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Register() {
  const router = useRouter();

  const textColor = useThemeColor({ light: '#11181C', dark: '#ECEDEE' }, 'text');
  const checkcolor = useThemeColor({ light: Buttoncolor.bblue, dark: Buttoncolor.bgreen }, 'text');

  const [isPasswordShown, setIsPasswordShown] = React.useState(true);

  const initialValues: FormValues = {
    userName: '',
    email: '',
    password: '',
  };

  const formSubmitHandler = async (values: FormValues) => { // Specify FormValues type for values
    try {
      await axiosInstance.post('/register', values)
        .then(res => {
          console.log('User registered successfully');
          if (res.status === 201) {
            router.push('/login');
          }
        })
        .catch(error => {
          console.error('An unexpected error occurred!', error);
          if (error.response && error.response.status === 400) {
            console.error('Email already exists');
          }
        });

    } catch (er) {
      console.log({ er });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => formSubmitHandler(values)} // values will now have the type FormValues
    >
      {(formikProps: FormikProps<FormValues>) => (
        <ParallaxScrollView
          headerBackgroundColor={{ light: '#2C3E50', dark: '#353636' }}
          headerTitle="Welcome!"
          headerSubtitle='sign up to continue'
        >
          <ThemedView style={{ marginBottom: -7 }}>
            <Text style={{
              color: textColor,
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}>User Name </Text>

            <ThemedView style={{
              width: "100%",
              height: 48,
              borderColor: Inputtextname.coolgray,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>

              <TextInput
                value={formikProps.values.userName}
                onChangeText={formikProps.handleChange('userName')}
                onBlur={formikProps.handleBlur('userName')}
                placeholder='Enter user name'
                placeholderTextColor={Inputtextname.coolgray}
                keyboardType='email-address'
                style={{
                  width: "100%",
                  color: textColor,
                }}
              />
            </ThemedView>
            {formikProps.touched.userName && formikProps.errors.userName &&
              <Text style={{ color: 'red', fontSize: 12 }}>{formikProps.errors.userName}</Text>
            }
          </ThemedView>

          <ThemedView style={{ marginBottom: -7 }}>
            <Text style={{
              color: textColor,
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}>Email Address</Text>

            <ThemedView style={{
              width: "100%",
              height: 48,
              borderColor: Inputtextname.coolgray,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>

              <TextInput
                value={formikProps.values.email}
                onChangeText={formikProps.handleChange('email')}
                onBlur={formikProps.handleBlur('email')}
                placeholder='Enter your Email address'
                placeholderTextColor={Inputtextname.coolgray}
                keyboardType='email-address'
                style={{
                  width: "100%",
                  color: textColor
                }}
              />
            </ThemedView>
            {formikProps.touched.email && formikProps.errors.email &&
              <Text style={{ color: 'red', fontSize: 12 }}>{formikProps.errors.email}</Text>
            }
          </ThemedView>

          <ThemedView style={{ marginBottom: 20 }}>
            <Text style={{
              color: textColor,
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}>Password</Text>

            <ThemedView style={{
              width: "100%",
              height: 48,
              borderColor: Inputtextname.coolgray,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>

              <TextInput
                value={formikProps.values.password}
                onChangeText={formikProps.handleChange('password')}
                onBlur={formikProps.handleBlur('password')}
                placeholder='Enter password'
                placeholderTextColor={Inputtextname.coolgray}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                  color: textColor,
                }}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  right: 12,
                  position: "absolute",
                }}
              >
                {
                  isPasswordShown == true ? (
                    <Ionicons name="eye-off" size={24} color={textColor} />

                  ) : (
                    <Ionicons name="eye" size={24} color={textColor} />
                  )
                }
              </TouchableOpacity>
            </ThemedView>
            {formikProps.touched.password && formikProps.errors.password &&
              <Text style={{ color: 'red', fontSize: 12 }}>{formikProps.errors.password}</Text>
            }
          </ThemedView>

          <Button
            title="SIGN UP"
            onPress={formikProps.handleSubmit} // Use handleSubmit from formikProps
            filled
            style={{
              marginTop: 1,
              marginBottom: 4,
            }}
          />

          <ThemedView style={{
            flexDirection: 'row',
            justifyContent: "center",
            marginVertical: 22,
          }}>
            <Text style={{
              fontSize: 16,
              color: textColor,
            }}>Already have an Account?</Text>
            <Link style={{ color: textColor, fontSize: 16, fontWeight: 800, textDecorationLine: 'underline' }} href="/login"> Sign In</Link>
          </ThemedView>
        </ParallaxScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});