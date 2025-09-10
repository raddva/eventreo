import HomeSlider from "./HomeSlider";
import useHome from "./useHome";

const Home = () => {
    const { dataBanners, isLoadingBanners } = useHome();

    return (
        <div>
            <HomeSlider banners={dataBanners?.data} isLoadingBanners={isLoadingBanners}>

            </HomeSlider>
        </div>
    )
}

export default Home;