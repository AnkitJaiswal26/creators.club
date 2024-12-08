import React, { useCallback, useContext, useEffect, useState } from "react";
import { useOkto } from "okto-sdk-react";
import styled from "styled-components";
import logo from "../../images/logo.svg";
import headerbg from "../../images/headerbg.png";
import googleLogo from "../../images/googleLogo.png";
import orDividerImg from "../../images/orDivider.svg";
import { StoreContext } from "../../utils/Store";
import { connectToMetamask } from "../../utils/user";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useCrowdFundingContext } from "../../contexts/ContentContext";
// import

const SignUpPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SignUpHeroSection = styled.div`
  width: 100%;
  background-image: url(${headerbg});
  background-size: cover;
  background-position: center;
  padding: 5rem 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpAppLogo = styled.img`
  height: 4rem;
  margin-bottom: 2rem;
`;

const SubHeaderSpan = styled.span`
  font-size: 1.2rem;
  text-align: center;
`;

const SignUpContentSection = styled.div`
  width: 100%;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const SignUpFormHeading = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
`;

const SignUpGoogleButton = styled.button`
  background-color: #e4e4e4 !important;
  border: none;
  outline: none;
  border-bottom: #8e8e8e 6px solid;
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transition: all 0.1s ease;
    transform: translateY(4px) rotateZ(2deg);
  }
`;

const GoogleLogo = styled.img`
  height: 2rem;
  margin-left: 0.4rem;
`;

const OrDivider = styled.img`
  margin: 2rem;
  height: 1rem;
`;

const TextInputGroup = styled.div`
  background-color: #161616;
  color: white;
  border-radius: 6px;
  border: none;
  outline: none;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  margin: 1rem;
  margin-bottom: 0.5rem;
  width: 300px;
  flex-direction: column;
  display: flex;

  span {
    font-size: 0.8rem;
    font-weight: bold;
    margin-bottom: 0.6rem;
    color: #c1c1c1;
  }
`;

const CustomInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 1.1rem;
`;

const SignUpButton = styled.button`
  background-color: #8216ee;
  color: white;
  border: none;
  outline: none;
  border-bottom: #6a1ab9 6px solid;
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transition: all 0.1s ease;
    transform: translateY(4px) rotateZ(2deg);
  }
  margin: 1rem auto;
`;
const NoneButton = styled.button`
  display: none;
`;
const AnonButton = styled.button`
  margin: auto !important;
  visibility: hidden;
`;
const FlexGroup = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: row;
`;

const SignUpPage = ({ setAuthToken, authToken, handleLogout }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { authenticate } = useOkto();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);
  const [isAnonVerified, setIsAnonVerified] = useState(false);
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const { getUserDetails } = useOkto();

  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    console.log("google idtoken: ", idToken);
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        console.log("Authentication check: ", authResponse);
        setAuthToken(authResponse.auth_token);
        console.log("auth token received", authToken);
        setIsGoogleAuthenticated(true);
        navigate("/signup");
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  const googleLoginHandler = async (e) => {
    e.preventDefault();
  };

  const handleVerifyAnon = useCallback((e) => {}, []);

  const {registerUser} = useCrowdFundingContext();

  const handleCreateAccount = useCallback(async (e) => {
      const ageAbove18 = latestProof.claim.ageAbove18;
      const gender = latestProof.claim.gender;
      const signalHash = latestProof.signalHash;
      const details = await getUserDetails();
      
      onSignUpSuccessMetamask();
  }, []);

  const onSignUpSuccessMetamask = () => {
    navigate("/home");
  };

  const onLogoutClick = () => {
    handleLogout(); // Clear the authToken
    navigate("/"); // Navigate back to the login page
  };

  const handleEmail = async (e) => {
    const details = await getUserDetails();
    console.log("details", details);
    setEmail(details.email);
  };

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      console.log(anonAadhaar.status);
    }
  }, [anonAadhaar]);

  useEffect(() => {
    if (isGoogleAuthenticated) {
      handleEmail();
    }
  }, [isGoogleAuthenticated]);

  return (
    <SignUpPageContainer>
      <SignUpHeroSection>
        <SignUpAppLogo src={logo} />
        <SubHeaderSpan>
          A secure platform for Independent
          <br />
          creators to build a healthy community!
        </SubHeaderSpan>
      </SignUpHeroSection>
      <SignUpContentSection>
        <SignUpFormHeading>
          Are you a Content Consumer?
          <br />
          Join your community
        </SignUpFormHeading>
        {isGoogleAuthenticated && (
          <div>
            <TextInputGroup>
              <span>Full Name</span>
              <CustomInput
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </TextInputGroup>
            <TextInputGroup>
              <span>Email</span>
              <CustomInput
                type="text"
                value={email}
                disabled={email !== null && email !== ""}
              />
            </TextInputGroup>
            <FlexGroup>
              <AnonButton></AnonButton>
              <LogInWithAnonAadhaar
                fieldsToReveal={["revealAgeAbove18", "revealGender"]}
                nullifierSeed={1234}
                // className="custom-log-in"
                buttonStyle={{ backgroundColor: "blue", color: "white" }}
              />
              <AnonButton></AnonButton>
            </FlexGroup>

            <SignUpButton onClick={handleCreateAccount}>
              Create Account
            </SignUpButton>
          </div>
        )}
        {!authToken && !isGoogleAuthenticated ? (
          <FlexGroup>
            <AnonButton></AnonButton>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={(error) => {
                console.log("Login Failed", error);
              }}
              useOneTap
              promptMomentNotification={(notification) =>
                console.log("Prompt moment notification:", notification)
              }
              render={(renderProps) => (
                <SignUpGoogleButton
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Sign Up with <GoogleLogo src={googleLogo} />
                </SignUpGoogleButton>
              )}
            />
            <AnonButton></AnonButton>
          </FlexGroup>
        ) : (
          <NoneButton onClick={onLogoutClick}>Authenticated, Logout</NoneButton>
        )}
      </SignUpContentSection>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
