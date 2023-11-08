const Owner = "humans-of-near.near";
const API_URL = "https://humans.nearverselabs.com/api";

const { humans, profileModal, filtersModal, showProfile, showFilters } = props;

State.init({
  mobileMenu: false,
});

const Sidebar = styled.div`
  position: absolute;
  right: 40px; 
  height: 100%; 
  padding-top:32px;
  padding-bottom:32px;
  & .btn-menu {
      display: none;
  }

  @media (max-width: 510px) {
    padding-top:15px;

    right: 20px;
    & .menu {
      display: none;
    }

    & .btn-menu {
      display: block;
    }
  }
`;

const SidebarContent = styled.div`
  color: white;
  height: 100%;
  display: flex;
  border-radius: 6px;
  padding: 30px 6px;
  text-align: center;
  background: #22272B;
  align-items: center;
  border: 1px solid #FFF;
  flex-direction: column;
  justify-content: space-between;
`;

const SidebarMobileContent = styled.div`
  z-index: 2;
  width: 100%;
  color: white;
  height: 100%;
  display: flex;
  position: absolute;
  text-align: center;
  background: #22272B;
  align-items: center;
  border: 1px solid #FFF;
  flex-direction: column;
  justify-content: space-between;
`;

const openMobileMenu = () => {
  State.update({
    ...state,
    mobileMenu: !state.mobileMenu,
  });
};

const openProfile = () => {
  openMobileMenu();
  showProfile();
};

const openFilters = () => {
  openMobileMenu();
  showFilters();
};

return (
  <>
    <Sidebar>
      <SidebarContent className="menu">
        <div className="d-flex flex-column" style={{ gap: 40 }}>
          <div
            style={{
              padding: "10px 0",
              borderBottom: profileModal ? "1px solid #FFF" : 0,
            }}
          >
            <button
              className="btn p-0"
              onClick={showProfile}
              style={{ width: "fit-content", height: "fit-content" }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.35 10.725V19.275C26.35 20.675 25.6 21.9751 24.3875 22.6876L16.9625 26.975C15.75 27.675 14.25 27.675 13.025 26.975L5.6 22.6876C4.3875 21.9876 3.6375 20.6875 3.6375 19.275V10.725C3.6375 9.32504 4.3875 8.02499 5.6 7.31249L13.025 3.025C14.2375 2.325 15.7375 2.325 16.9625 3.025L24.3875 7.31249C25.6 8.02499 26.35 9.31254 26.35 10.725Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 13.75C16.6085 13.75 17.9125 12.446 17.9125 10.8375C17.9125 9.22896 16.6085 7.92505 15 7.92505C13.3915 7.92505 12.0875 9.22896 12.0875 10.8375C12.0875 12.446 13.3915 13.75 15 13.75Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 20.8249C20 18.5749 17.7625 16.75 15 16.75C12.2375 16.75 10 18.5749 10 20.8249"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div
            style={{
              padding: "10px 0",
              borderBottom: filtersModal ? "1px solid #FFF" : 0,
            }}
          >
            <button
              className="btn p-0"
              onClick={showFilters}
              style={{ width: "fit-content", height: "fit-content" }}
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.1134 13.542H23.8277M12.3991 16.9706H21.542M14.6848 20.3991H19.2563"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="1.13137"
                  y="16.9705"
                  width="22.4"
                  height="22.4"
                  rx="1.2"
                  transform="rotate(-45 1.13137 16.9705)"
                  stroke="white"
                  strokeWidth="1.6"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <p style={{ fontSize: 12 }}>Events</p>
          <p>{humans}</p>
        </div>
      </SidebarContent>

      <button
        className="btn p-0 btn-menu"
        onClick={openMobileMenu}
        style={{ width: "fit-content", height: "fit-content" }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.25 30H33.75M6.25 10H33.75H6.25ZM6.25 20H33.75H6.25Z"
            stroke="white"
            strokeWidth="1.875"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </Sidebar>

    {state.mobileMenu && (
      <SidebarMobileContent>
        <div
          className="d-flex flex-column"
          style={{ gap: 40, marginTop: "25%" }}
        >
          <button
            className="btn p-0 position-absolute"
            onClick={openMobileMenu}
            style={{ top: 29, right: 29, color: "#FFF" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
            >
              <path
                fill="currentColor"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
              />
            </svg>
          </button>
          <button
            className="btn p-0 d-flex justify-content-center align-items-center"
            onClick={openProfile}
            style={{
              width: "fit-content",
              height: "fit-content",
              gap: 40,
              color: "white",
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.35 10.725V19.275C26.35 20.675 25.6 21.9751 24.3875 22.6876L16.9625 26.975C15.75 27.675 14.25 27.675 13.025 26.975L5.6 22.6876C4.3875 21.9876 3.6375 20.6875 3.6375 19.275V10.725C3.6375 9.32504 4.3875 8.02499 5.6 7.31249L13.025 3.025C14.2375 2.325 15.7375 2.325 16.9625 3.025L24.3875 7.31249C25.6 8.02499 26.35 9.31254 26.35 10.725Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 13.75C16.6085 13.75 17.9125 12.446 17.9125 10.8375C17.9125 9.22896 16.6085 7.92505 15 7.92505C13.3915 7.92505 12.0875 9.22896 12.0875 10.8375C12.0875 12.446 13.3915 13.75 15 13.75Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 20.8249C20 18.5749 17.7625 16.75 15 16.75C12.2375 16.75 10 18.5749 10 20.8249"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p
              className="m-0"
              style={{
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Profile
            </p>
          </button>

          <button
            className="btn p-0 d-flex justify-content-center align-items-center"
            onClick={openFilters}
            style={{
              width: "fit-content",
              height: "fit-content",
              gap: 40,
              color: "white",
            }}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1134 13.542H23.8277M12.3991 16.9706H21.542M14.6848 20.3991H19.2563"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="1.13137"
                y="16.9705"
                width="22.4"
                height="22.4"
                rx="1.2"
                transform="rotate(-45 1.13137 16.9705)"
                stroke="white"
                strokeWidth="1.6"
              />
            </svg>
            <p
              className="m-0"
              style={{
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Filter
            </p>
          </button>
        </div>
        <div
          className="d-flex align-items-center"
          style={{ gap: 24, marginBottom: "13%" }}
        >
          <p style={{ fontSize: 20 }}>Events:</p>
          <p style={{ fontSize: 30, fontWeight: 700 }}>{humans}</p>
        </div>
      </SidebarMobileContent>
    )}
  </>
);