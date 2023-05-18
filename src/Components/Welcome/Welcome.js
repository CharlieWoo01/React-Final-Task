import Card from "../Card/Card";
import MainNavigation from "../Navigation/MainNavigation";

function Welcome() {
  return (
    <>
      <MainNavigation />
      <div className="card-container">
        <Card>
          Welcome to NatWest, a leading retail and commercial bank in the United
          Kingdom with a rich history dating back over 200 years. We pride
          ourselves on our commitment to putting our customers first, and we
          offer a wide range of financial products and services to help you
          manage your money and achieve your goals. At NatWest, we understand
          that each customer is unique, which is why we offer tailored solutions
          to meet your specific needs. Whether you're looking to open a current
          account, save for a rainy day, or invest for your future, our team of
          experts is here to help you every step of the way. We also offer a
          range of digital tools and services to make managing your finances
          easier than ever before. From our award-winning mobile banking app to
          our online banking platform, you can access your accounts anytime,
          anywhere, and stay in control of your finances. At NatWest, we believe
          in making a positive impact on the communities we serve. We are
          committed to promoting diversity and inclusion, supporting local
        </Card>
      </div>
    </>
  );
}
export default Welcome;
