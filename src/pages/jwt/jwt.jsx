import React, { useState } from "react";
import { JWT } from "../../utils/jwt-parser.js";
const jwt = new JWT();
export default function DemoJWT() {
  const [jwtData, setJwtData] = useState("");
  return (
    <>
      <div>
        JWTDATA = <br /> {jwtData}
      </div>
      <button
        onClick={() =>
          jwt.parse(
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MjY2NzY5MjcsImV4cCI6MTY1ODIxMjkyNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjoidXNlciIsImxhbmciOiJlbiJ9.Weo08zg4bhW57nPQg5UT6SNHEr-csGpszWZJk7WSXQc"
          )}
      >
        1) parse jwt
      </button>
      <button onClick={() => setJwtData(JSON.stringify(jwt.get()))}>
        2) get jwt
      </button>
    </>
  );
}
