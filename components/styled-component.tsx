import { View } from "react-native";
import styled from 'styled-components/native';

export const StyledView = styled(View)<{color: string}>`
  padding: 10px;
  margin: 10px;    
  width: 200px;
  height: 200px;
  background-color: hsla(76, 40%, 70%, 1);
  border-radius: 10px;  

  //shadowColor: ${props => props.color};
  /* shadowOffset: {
    width: 0;
    height: 6;
  }; */
  shadowOpacity: 0.39;
  shadowRadius: 8.32px;

  elevation: 13;
  
`;
