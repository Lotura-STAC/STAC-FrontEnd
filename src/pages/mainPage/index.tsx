import { styled } from "styled-components";
import { Header } from "../../components/Header";
import { Banner } from "../../components/Banner";
import { isLoggedIn } from "../../libs/utils/isLoggedIn";
import { Button } from "../../components/Button";
import { HomeArticle } from "../../components/HomeArticle";
import { Home } from "../../assets/images";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";

export const MainPage = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Banner>
          {isLoggedIn ? (
            <Button
              label="마이페이지"
              width={160}
              color="colored"
              type="a"
              to="/device"
            />
          ) : (
            <>
              <Button
                label="로그인"
                width={160}
                color="uncolored"
                type="a"
                to="/login"
              />
              <Button
                label="회원가입"
                width={160}
                color="colored"
                type="a"
                to="/signup"
              />
            </>
          )}
        </Banner>
        <HomeArticle
          title="원격 모니터링 및 편의성 증진"
          subTitle={`세탁기와 건조기를 원격으로 확인하면 현재 작동 중인 세탁기 또는 건조기를 실시간으로 확인할 수 있습니다. 이는 예를 들어, 세탁기 또는 건조기가 작동 중인지 확인하는 데 도움이 됩니다.
        모바일 애플리케이션의 경우 세탁이나 건조가 완료되었을 때 푸시 알림을 받을 수 있어서, 작업이 완료된 즉시 확인할 수 있습니다. 이로써 세탁물을 빠르게 처리하고 효율적으로 일상생활을 관리할 수 있습니다.`}
          image={Home.HomeImg1}
          direction="ltr"
        />
        <HomeArticle
          title="24시간 친절한 고객 센터"
          subTitle={`어려움을 겪거나 질문이 생겼을 때, 고객센터는 즉각적인 대응을 제공하고 빠르게 문제를 해결하거나 편리한 접근 경로를 제공하여 고객이 손쉽게 도움을 청할 수 있도록 합니다. 이를 통해 서비스 이용 중에 발생하는 불편을 최소화할 수 있습니다.
        또한 고객센터를 통해 수집된 피드백은 서비스나 제품 개선에 활용됩니다. 소중한 고객님의 의견은 저희 Lotura가 더 나은 제품과 서비스를 개발하는 데 도움을 줍니다.`}
          image={Home.HomeImg2}
          direction="rtl"
        />
        {!isLoggedIn && (
          <Suggest>
            <p>아직 회원이 아니신가요?</p>
            <Link to="/signup">지금 가입하고 시작하세요!</Link>
          </Suggest>
        )}
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.main`
  margin-bottom: 48px;

  width: 100vw;
  height: auto;
  min-height: calc(100vh - 210px);

  display: flex;
  flex-direction: column;

  article {
    padding-left: 10vw;
    padding-right: 10vw;
  }
`;

const Suggest = styled.div`
  margin-top: 48px;

  width: 100%;

  padding-left: 10vw;
  padding-right: 10vw;

  display: flex;
  justify-content: center;

  p {
    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaLight};
    font-size: ${({ theme }) => theme.fontSizes.text};
    font-weight: 300;
  }

  a {
    margin-left: 4px;

    color: ${({ theme }) => theme.colors.main2};
    font-family: ${({ theme }) => theme.fontFamily.spoqaRegular};
    font-size: ${({ theme }) => theme.fontSizes.text};
    text-decoration: underline;
  }
`;
