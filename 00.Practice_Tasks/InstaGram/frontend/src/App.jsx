// import SplashCursor from './componets/ui/SplashCursor'
import AppRoutes from './Routes/Routes'
import "./App.css"
import Noise from './componets/ui/Noise'
import SplashCursosor from "./componets/ui/SplashCursor"



const App = () => {


  return (
    <>
      <Noise
        patternSize={250}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={2}
        patternAlpha={15}
      />
      {/* <SplashCursosor /> */}
      <AppRoutes />
    </>
  )
}

export default App