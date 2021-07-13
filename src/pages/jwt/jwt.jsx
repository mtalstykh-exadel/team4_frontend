import React from 'react';
import JWT from '../../utils/jwt-parser.js';
export default function DemoJWT(){
    return(
        <>
            <button onClick={ ()=>JWT.parse("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MjYxNjk2OTksImV4cCI6MTY1NzcwNTY5OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5hbWUiOiJKb2hubnkgUm9ja2V0IiwiZW1haWwiOiJkYXNkQG1haWwuZ2xvYmFsIiwicm9sZSI6InVzZXIifQ.HTDnBXJxkmky_YqOOw_L5nu2Xn6A-UZQp-5u2WBPZIg") }>
                1) parse jwt
            </button>
            <button onClick={ ()=>console.log(JWT.get()) }>2) get jwt</button> 
        </>
    );
}

