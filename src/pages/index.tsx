import {
  Html,
  Image,
  Preload,
  Scroll,
  ScrollControls,
  useScroll,
} from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense, useRef } from 'react'

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
  ssr: false,
})

const MainBg = () => {
  const { width, height } = useThree((state) => state.viewport)
  const data = useScroll()
  const mainBg = useRef<any>()
  const introWrap = useRef<any>()
  useFrame(() => {
    if (introWrap?.current) {
      // console.log(introWrap.current)
      introWrap.current.style.opacity = 1 - data.range(0, 1 / 3)
    }
    if (mainBg?.current) {
      // console.log(mainBg)
      // bgImage.current.material.zoom = 1 + data.range(0, 1 / 3) / 3
      // bgImage.current.material.uniforms.opacity = 1 - data.range(0, 1 / 3)
      mainBg.current.style.opacity = 1 - data.range(0, 1 / 3)
      mainBg.current.style.backgroundPositionY = `${
        -data.range(0, 1 / 3) * 150
      }px`
      // bgImage.current.material.uniformsNeedUpdate = true
      // bgImage.current.material.transparent = true
      // bgImage.current.material.opacity = 0
    }
  })
  return (
    <group>
      <Suspense fallback={null}>
        <Html center style={{ pointerEvents: 'none' }}>
          <div
            className='mainBg'
            ref={mainBg}
            style={{
              width: '100vw',
              height: '100vh',
              top: 0,
              left: 0,
              backgroundImage:
                "url('https://digitalspecial.joongang.co.kr/_o/img/newsroom/2018/1011_deepsea/mainbg.jpg')",
              backgroundPositionX: 'center',
              backgroundPositionY: '0px',
              backgroundColor: '#082a62',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              transformOrigin: 'center top',
              transform: 'scale(1.2)',
            }}
          ></div>
        </Html>
        <Html
          style={{
            transform: 'translate3d(-50%, -78%, 0px)',
            pointerEvents: 'none',
          }}
        >
          <div className='introWrap' ref={introWrap}>
            <h1
              className='title'
              style={{
                width: '679px',
                height: '135px',
                background: `url("https://digitalspecial.joongang.co.kr/_o/img/newsroom/2018/1011_deepsea/title.png") 0 0 no-repeat`,
              }}
            ></h1>
            <div style={{ height: '55px' }}></div>
            <p
              className='pc_item'
              style={{
                fontSize: '17px',
                color: '#b5c7d0',
                textAlign: 'center',
              }}
            >
              ??????. ?????? ??????????????? ????????? ?????? ??????????????????. ????????? ??? ???
              ??????????
              <br></br>
              ??????, ?????? 12cm??? ?????? ???????????? ????????? ?????? ????????? ?????????.
              <br></br>
              ??????????????? ????????? ?????? ??? ?????? ???????????? ?????? ??????.
              <br></br>
              <strong style={{ fontSize: '20px', color: 'white' }}>
                ??? ???(?)??? ???????????? ????????? ????????? ????????????, ??? ????????? ?????? ??????.
              </strong>
              <br></br>
              ???, ????????? ??? ?????? ?????? ???????????? ??? ????????????????
              <br></br>
              ?????? ???????????? ?????? ?????? ????????? ??? ?????????.
            </p>
          </div>
        </Html>
      </Suspense>
    </group>
  )
}

// dom components goes here
const DOM = () => {
  return (
    <>
      <Canvas
        style={{
          backgroundImage: 'linear-gradient(#36558a, #010f15, #010f15)',
        }}
        gl={{ antialias: true }}
      >
        <ScrollControls pages={2} damping={6}>
          <MainBg />
          <Scroll>
            <Html
              style={{
                transform: 'translate3d(-50%, -50%, 1111px)',
                width: '100vw',
                top: '100vh',
                color: 'white',
                textAlign: '-webkit-center',
              }}
            >
              <div>
                <h2 style={{ fontSize: '30px' }}>
                  ??????, ????????? ????????????. <br />
                  <strong>???????????? ???????????? ????????? ??? ??? ?????? ????</strong>
                </h2>
                <div
                  className='addBtnWrap'
                  style={{
                    position: 'relative',
                    background: '#14479a',
                    width: '270px',
                    height: '84px',
                    borderRadius: '50px 0px 0px 50px',
                    padding: '10px 50px 0px 50px',
                    left: '-20px',
                  }}
                >
                  <input
                    id='numberInput'
                    type='number'
                    min={1}
                    max={20}
                    value={10}
                    maxLength={2}
                    placeholder='0'
                    style={{
                      overflow: 'hidden',
                      fontSize: '40px',
                      width: '240px',
                      background: 'transparent',
                      margin: 0,
                      border: 0,
                      outline: 0,
                      verticalAlign: 'baseline',
                      cursor: 'pointer',
                    }}
                  />
                  <input
                    className='addBtn'
                    type='submit'
                    value='??????'
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: '-42px',
                      width: '84px',
                      height: '84px',
                      borderRadius: '50px',
                      color: '#082a62',
                      fontSize: '22px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>
            </Html>
          </Scroll>
          <Preload />
        </ScrollControls>
      </Canvas>
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
