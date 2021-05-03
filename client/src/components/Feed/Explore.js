import VideoCard from 'components/Main/VideoCard';
import {
  getAllVideos,
  getExploreVideos,
  getTrendingVideos,
} from 'modules/reducers/video';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GridContainer } from 'styles/container';
import { media } from 'styles/media_query';
import { FeedHeader } from 'styles/typography';
import trending from 'assets/trending.png';
import all from 'assets/all.png';
import vlog from 'assets/vlog.png';
import music from 'assets/music.png';
import movie from 'assets/movie.png';
import game from 'assets/game.png';
import education from 'assets/education.png';
import sports from 'assets/sports.png';

const Explore = () => {
  const dispatch = useDispatch();
  const VideoStat = useSelector(state => state.video);
  const [CurrentCategory, setCurrentCategory] = useState('전체');

  useEffect(() => {
    dispatch(getAllVideos());
  }, []);

  const onTrendingVideos = useCallback(e => {
    setCurrentCategory(e.currentTarget.textContent);
    const Value = e.currentTarget.value;
    if (Value === 'trending') {
      dispatch(getTrendingVideos());
    } else if (Value === 'all') {
      dispatch(getAllVideos());
    } else {
      console.log(Value);
      dispatch(getExploreVideos(Value));
    }
  }, []);

  return (
    <>
      <CategoryBox>
        <CategoryButton type="button" value="all" onClick={onTrendingVideos}>
          <img src={all} alt="all" />
          전체
        </CategoryButton>
        <CategoryButton
          type="button"
          value="trending"
          onClick={onTrendingVideos}
        >
          <img src={trending} alt="trending" />
          인기
        </CategoryButton>
        <CategoryButton type="button" value="vlog" onClick={onTrendingVideos}>
          <img src={vlog} alt="vlog" />
          일상
        </CategoryButton>
        <CategoryButton type="button" value="music" onClick={onTrendingVideos}>
          <img src={music} alt="music" />
          음악
        </CategoryButton>
        <CategoryButton type="button" value="game" onClick={onTrendingVideos}>
          <img src={game} alt="game" />
          게임
        </CategoryButton>
        <CategoryButton type="button" value="movie" onClick={onTrendingVideos}>
          <img src={movie} alt="movie" />
          영화/드라마
        </CategoryButton>
        <CategoryButton
          type="button"
          value="education"
          onClick={onTrendingVideos}
        >
          <img src={education} alt="education" />
          교육
        </CategoryButton>
        <CategoryButton type="button" value="sports" onClick={onTrendingVideos}>
          <img src={sports} alt="sports" />
          스포츠
        </CategoryButton>
      </CategoryBox>
      <FeedHeader>
        <h2>인기 급상승 동영상 - {CurrentCategory}</h2>
      </FeedHeader>
      <GridContainer>
        {VideoStat.getVideoDone &&
          VideoStat.videos.map(video => {
            return <VideoCard key={video._id} video={video} />;
          })}
        {VideoStat.trendingVideosDone &&
          VideoStat.trendingVideos.map(video => {
            return <VideoCard key={video._id} video={video} />;
          })}
        {VideoStat.exploreVideosDone &&
          VideoStat.exploreVideos.map(video => {
            return <VideoCard key={video._id} video={video} />;
          })}
      </GridContainer>
    </>
  );
};

export default Explore;

const CategoryBox = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 20px;
  margin-bottom: 40px;

  ${media.desktop`
    grid-template-columns: repeat(4,1fr);
  `}
  ${media.tablet`
    grid-template-columns: repeat(3,1fr);
  `}
  ${media.mini`
    grid-template-columns: repeat(2,1fr);
  `}
`;

const CategoryButton = styled.button`
  background-color: ${({ theme }) => theme.contentBox};
  color: ${({ theme }) => theme.iconColor};
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 80px;
  border-radius: 8px;
  & img {
    width: 36px;
    margin-right: 15px;
  }
`;
