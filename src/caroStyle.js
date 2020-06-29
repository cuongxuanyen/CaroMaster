import styled from 'styled-components';

export const Button = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 14px;
  font-weight: bold;
  line-height: 24px;
  height: 24px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 24px;
  color: ${props => props.color};
`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const Container = styled.div`
  width: auto;
`;
export const WrapperBottom = styled.div`
width: auto;
height: auto;
display: flex;
margin-top: 18px;
flex-direction: column;
justify-content: space-evenly;
`;
export const Input = styled.input`
  width: ${props => props.width || '4'}em;
  height: 0.7em;
  font-size: 1em;
  padding: 5.5px;
  font-family: cursive;
`;
export const ButtonStart = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  background: #51F;
  color: #fff;
  margin-right: 20px;
  margin-top: -1px;
  margin-left: 20px;
  padding: 0;
  text-align: center;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  cursor: pointer;
`;
export const WrapperEdit = styled.div`

`;
export const Span = styled.span`
  white-space: pre-wrap;
  font-family: cursive;
  font-size: ${props => props.size}px;
`;
export const WrapperSquare = styled.div`
  display: flex;
`;
export const WrapperTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 7em;
  justify-content: space-evenly;
`;
export const Player = styled.div`
  border-radius: 0.5em;
  border-color: ${props => props.color};
  color: ${props => props.color};
  text-align: center;
  border-style: double;
  margin-top: 10px;
`;
export const Bottom = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
export const Winner = styled.div`
  display: flex;
  width: 0em;
  color: crimson;
  text-align: center;
`;
export const Back = styled.button`
  width: 4em;
  height: 2em;
  cursor: pointer;
  margin-top: 1em;
`;
