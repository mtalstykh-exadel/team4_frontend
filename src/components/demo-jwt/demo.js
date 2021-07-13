import React from "react";
import JWT from '../../utils/jwt-parser.js';

export default function JWTdemo(){
    return(
        <>
        <button onClick = {()=>{JWT.parse("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MjYxNjA3OTQsImV4cCI6MTY1NzY5Njc5NCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaW1nIjoiaHR0cHM6Ly9taXJwb3ppdGl2YS5ydS93cC1jb250ZW50L3VwbG9hZHMvMjAxOS8xMS8xNDcyMDQyNzE5XzE1LmpwZyIsIm5hbWUiOiJBbGJlcnQgRWluc3RlaW4ifQ.kJsZuRrqspFXaABSO3jOVzB4RKdMIpyhisp7CO2se8c");}}>
            parse jwt
        </button>
        <button onClick = {()=>{console.log(JWT.get());}}> get JWT </button>
        </>
    );
}