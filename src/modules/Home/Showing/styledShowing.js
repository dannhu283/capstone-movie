import styled from "styled-components";

export const CarouselContainer = styled.div`
  .slick-dots {
    bottom: -40px;
  }
  .slick-dots li.slick-active button:before {
    color: #3ae374;
    font-size: 20px;
  }
  .slick-dots li button:before {
    font-size: 15px;
    transition: all 0.5s;
  }

  .slick-dots li:hover button:before {
    font-size: 20px;
    color: #3ae3755c;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 80px;
  }
`;
