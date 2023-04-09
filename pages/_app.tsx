import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { LicenseInfo } from '@mui/x-license-pro';
import { InMemoryCache, ApolloClient, ApolloProvider, useQuery } from '@apollo/client';
import gql from 'graphql-tag';


const inter = Inter({ subsets: ['latin'] });


    LicenseInfo.setLicenseKey('9e17734200a964cd420488accda5490fTz01ODkyOSxFPTE3MDY4NzA0MzEyMTAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');
    
      const cache = new InMemoryCache({
        typePolicies:{
          Query:{
            fields:{
              clients:{
                merge(existing, incoming){
                  return incoming;
                },
              },
              projects: {
                merge(existing, incoming){
                  return incoming;
                }
              },
              leads: {
                merge(existing, incoming){
                  return incoming;
                },
              },
              users: {
                merge(existing, incoming){
                  return incoming;
                },
              }
            }
          }
        }
      });
      
    
      
      const client = new ApolloClient({
        uri: 'http://localhost:5000/graphql',
        cache,
      }) 
      
      
      



function App({ Component, pageProps }: AppProps<{}>) {
  return (


    <ApolloProvider client={client}>
    <div className={inter.className}>
      <Toaster />
      <Component {...pageProps} />
    </div>
    </ApolloProvider>
  );
}

export default appWithTranslation(App);
