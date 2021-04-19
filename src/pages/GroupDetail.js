import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Grid, Button, Text, Image } from "../elements";
import { Header, Chat } from "../components";
import Runtan from "../images/runtan.gif";
import Jump from "../images/jump.png";
import Cheer from "../images/cheer.png";
import Fire from "../images/fire.png";
import Dino from "../images/dino_kill.png";
import Trophy from "../images/trophy.png";
import Spinner from "../shared/Spinner";
import Quest from "../components/Quest";
import Comment from "../components/Comment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import MenuListComposition from "../components/MenuList";
import {actionCreators as groupActions} from "../redux/modules/group";
import {actionCreators as cmtActions} from "../redux/modules/comment";
import moment from "moment";

const GroupDetail = (props) => {
const dispatch = useDispatch();

  const group_list = useSelector((state) => state.group.group_list.joined);
  const id = props.match.params.id;
  const group = group_list.find((group) => group.groupId === id);
  const user = useSelector((state) => state.user.user);
  const cmt_list = useSelector((state)=> state.comment.cmt_list);
console.log(cmt_list);
  const chatOnOff = useSelector((state) => state.quest.chat);
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  React.useEffect(()=>{
    if(group){
      dispatch(groupActions.getRankDB(group.groupId));
      dispatch(cmtActions.setCmtDB(group.groupId));
      return;
    }
    dispatch(groupActions.getGroupDB());
  },[group]);

  return (
    <React.Fragment>
      <ContainerBox style={chatOnOff ? { paddingLeft: "230px" } : {}}>
        <Header />
        <Chat chat={chatOnOff} />
        {!group ? (
          <Spinner />
        ) : (
          <ContentBox>
            <ListBox>
              <BoxTitle>
                <Image src={Runtan} width="50px" height="50px" contain />
                <Text size="11px">
                  클럽장
                  <br /> {group.nickname}
                </Text>
              </BoxTitle>

              <TopMenu onClick={handleToggle}>
                <MenuListComposition
                  open={open}
                  handleClose={handleClose}
                  founder={group.nickname}
                  group={group}
                />
                <MoreHorizIcon />
              </TopMenu>

              <GroupBox>
                <Text bold margin="0 0 2px 0">
                  {group.groupName}
                </Text>
                <Text size="14px">{group.groupDesc}</Text>
                <TodoInput
                  placeholder={`${user.nickname}님! 각오 한 마디 남겨주세요!`}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                      console.log(group.groupId, e.target.value);
                      dispatch(cmtActions.addCmtDB(group.groupId, e.target.value));
                    }
                  }}
                />
              </GroupBox>
              <CmtList>
                {cmt_list.map((cmt, idx)=>
 <Comment key={cmt.cmtId} cmt={cmt} />
                )}
              </CmtList>
            </ListBox>

            <RankList>
              <BoxTitle>명예의 전당</BoxTitle>
              <Grid>
                <Rank className="first">
                  <Image src={Trophy} width="27px" height="40px" contain />
                  <Text bold title>
                    르탄이
                  </Text>
                  <Text size="8px" center title>
                    6시간 <br />
                    <Point>100%</Point>
                  </Text>
                </Rank>
                <Rank>
                  <Image src={Jump} width="30px" height="40px" contain />
                  <Text bold title>
                    르탄이
                  </Text>
                  <Text size="8px" center title>
                    6시간 <br />
                    <Point>100%</Point>
                  </Text>
                </Rank>
                <Rank>
                  <Image src={Jump} width="30px" height="40px" contain />
                  <Text bold title>
                    르탄이
                  </Text>
                  <Text size="8px" center title>
                    6시간 <br />
                    <Point>100%</Point>
                  </Text>
                </Rank>
                <Rank>
                  <Image src={Fire} width="30px" height="40px" contain />
                  <Text bold title>
                    르탄이
                  </Text>
                  <Text size="8px" center title>
                    6시간 <br />
                    <Point>100%</Point>
                  </Text>
                </Rank>
                <Rank>
                  <Image src={Fire} width="30px" height="40px" contain />
                  <Text bold title>
                    르탄이
                  </Text>
                  <Text size="8px" center title>
                    6시간 <br />
                    <Point>100%</Point>
                  </Text>
                </Rank>
              </Grid>
              <Image
                src={Dino}
                width="220px"
                height="80px"
                margin="30px 0 0 0"
                contain
              />
            </RankList>
          </ContentBox>
        )}
      </ContainerBox>
    </React.Fragment>
  );
};
export default GroupDetail;

const ContainerBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const ContentBox = styled.div`
  margin: 60px auto 0px auto;
  padding: 0px 100px 0 130px;
  width: 85%;

  gap: 35px;
  display: flex;
  justify-content: center;
`;
const BoxTitle = styled.div`
  color: #e3344e;
  font-size: 24px;
  font-family: "GmarketSansBold";
  letter-spacing: 1.2px;
  position: absolute;
  top: -23px;
  display: flex;
`;

const TopMenu = styled.div`
  /* color: #9A9A9A; */
  font-size: 24px;
  font-family: "GmarketSansBold";
  letter-spacing: 1.2px;
  position: absolute;
  top: 20px;
  right: 28px;
  display: flex;
  cursor: pointer;
  :hover {
  }
`;
const ListBox = styled.div`
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  font-size: 17px;
  margin-bottom: 30px;

  & :last-child {
    margin: 0px;
  }
  position: relative;
`;

const GroupBox = styled.div`
  width: 400px;
  height: 140px;
  overflow: hidden;
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  align-items: center;
  padding: 15px 20px;
  box-sizing: border-box;
  font-size: 17px;
  margin-bottom: 20px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

const RankList = styled.div`
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0px 1px 8px #dfdbdb;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  font-size: 17px;
  margin-bottom: 30px;
  position: relative;
  justify-content: space-between;
`;

const Rank = styled.div`
margin: 13px auto 0 auto;
width:210px;
height:48px;
box-sizing:border-box;
background-color: ${(props) => (props.className ? "#FCE3E3;" : "#ffffff;")}
    padding: 4px 23px;
    border-radius: 103px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    white-space: pre-line;

`;
const Point = styled.span`
  color: #e3344e;
`;

const CmtList = styled.div`
  margin-top: 18px;
  max-height: 515px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 17px;
    height: 100vh;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 20px;
    height: 50px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }
`;

const TodoInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1.5px solid #e3344e;
  width: 240px;
  outline: none;
  text-align: center;
  padding: 7px;
  margin-top: 7px;
`;
