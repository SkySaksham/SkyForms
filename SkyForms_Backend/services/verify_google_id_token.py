
from google.oauth2 import id_token
from google.auth.transport import requests
from config import OUTH_CLIENT_ID_GOOGLE



def verify_id_token_jwt(token) :
        # Specify the WEB_CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), OUTH_CLIENT_ID_GOOGLE)

        # Or, if multiple clients access the backend server:
        # idinfo = id_token.verify_oauth2_token(token, requests.Request())
        # if idinfo['aud'] not in [WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]:
        #     raise ValueError('Could not verify audience.')

        # If the request specified a Google Workspace domain
        # if idinfo['hd'] != DOMAIN_NAME:
        #     raise ValueError('Wrong domain name.')

        # ID token is valid. Get the user's Google Account ID from the decoded token.
        # This ID is unique to each Google Account, making it suitable for use as a primary key
        # during account lookup. Email is not a good choice because it can be changed by the user.
        return idinfo