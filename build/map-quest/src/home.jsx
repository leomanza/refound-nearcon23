const Owner = "humans-of-near.near";
const creator = "neardearla.near";
const API_URL = "https://humans.nearverselabs.com/api";
const MAP_STYLE = "mapbox://styles/mapbox/dark-v10";
const MAP_TOKEN =
  "pk.eyJ1IjoidGVqMDEiLCJhIjoiY2xqcHZ2dGpkMDB5azNsbzQ0bmMwNjRjaCJ9.FVv2zRPaLwzZMgagbI2YZw";

const center = [0, 30];
const zoom = 1.7;
const accountId = context.accountId;

State.init({
  profileModal: false,
  filtersModal: false,
  edit: false,
  user: {
    name: "",
    social: "",
    twitter: "",
    bio: "",
    role: "",
    community: "",
  },
  filters: {
    role: "",
    community: [],
  },
  old_locations: [],
  locations: [],
  humanAlert: true,
  openInfo: false,
  loaded: false,
  hideInfor: true,
  alert: "",
});

//Styles

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 190px);
  align-items: stretch;
  flex-direction: column;
  background: black;
  overflow: auto;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: absolute;
`;

const Sidebar = styled.div`
  position: absolute;
  right: 40px; 
  height: 100%; 
  width: 62px; 
  padding-top:32px;
  padding-bottom:32px;
`;

const SidebarContent = styled.div`
  padding: 40px 16px;
  display: flex;
  height: 100%;
  background: #22272B;
  color: white;
  border-radius: 6px;
  border: 1px solid #FFF;
`;

const Profile = styled.button`
  background: #191a1a;
  right: 50px;
  top: 30px;
  padding: 10px 22px;
  @media (max-width: 510px) {
    padding: 6px 15px;
    right: 15px;
    top: 15px;
  }
`;

const Location = styled.button`
  background: unset;
  bottom: 50px;
  padding: 10px 22px;
  @media (max-width: 510px) {
    padding: 6px 15px;
    bottom: 15px;
  }
`;

const BtnStyle = {
  borderRadius: "6px",
  border: "1px solid rgb(255, 255, 255)",
  color: "white",
  position: "absolute",
  zIndex: 1,
};

const BtnStyle2 = {
  background: "white",
  borderRadius: "6px",
  border: "1px solid rgb(255, 255, 255)",
  color: "#191a1a",
  position: "absolute",
  zIndex: 1,
};

const getFirstSBTToken = () => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: `${context.accountId}`,
    issuer: "fractal.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};

const hasSBTToken = getFirstSBTToken() !== undefined;

const showAlert = (text) => {
  State.update({
    alert: text,
  });
  setTimeout(() => {
    State.update({
      alert: "",
    });
  }, 3000);
};

const getMyData = () => {
  return asyncFetch(
    API_URL + `/auth/account?accountId=${accountId}&hasSBTToken=${hasSBTToken}`
  ).then((res) => {
    if (res.ok) {
      return res.body.user;
    }
  });
};

const getLocations = () => {
  return asyncFetch(API_URL + `/location`).then((res) => {
    if (res.ok) {
      return res.body;
    }
  });
};

const getMyInfor = async () => {
  getMyData().then((user) => {
    State.update({
      user,
      loaded: true,
    });
  });
};

const getLocationsData = async () => {
  getLocations().then((data) => {
    State.update({
      old_locations: data,
      locations: data,
      loaded: true,
    });
  });
};

const onProfileClose = () => {
  State.update({ profileModal: false });
};

const onFiltersClose = () => {
  State.update({ filtersModal: false });
};

const onHumanClose = () => {
  State.update({ humanAlert: false });
};

const onFilter = () => {
  const { old_locations, filters } = state;
  const result = old_locations.filter((row) => {
    if (filters.role) {
      if (row.user.role === filters.role) {
        if (filters.community.length) {
          const state = !!filters.community.find(
            (_row) => _row === row.user.community
          );
          if (state) return true;
          else return false;
        } else return true;
      } else return false;
    } else {
      if (filters.community.length) {
        const state = !!filters.community.find(
          (_row) => _row === row.user.community
        );
        if (state) return true;
        else return false;
      } else return true;
    }
  });
  State.update({
    ...state,
    filtersModal: false,
    locations: result,
  });
  showAlert("Filters Applied");
};

const clearFilter = () => {
  State.update({
    filters: { role: "", community: [] },
    locations: state.old_locations,
  });
  showAlert("Filters Removed");
};

const handleSaveLocation = async () => {
  if (!state.edit) return State.update({ edit: !state.edit });
  asyncFetch(`${API_URL}/location/bos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accountId }),
  }).then((res) => {
    showAlert("Location Updated!");
    State.update({
      edit: !state.edit,
      locations: res.body,
      old_locations: res.body,
    });
  });
};

const setOpenInfo = () => {
  State.update({
    openInfo: !state.openInfo,
  });
};

const setInfoIcon = (state) => {
  State.update({
    hideInfor: state,
  });
};

if (!state.loaded) {
  getMyInfor();
  getLocationsData();
}

const firstLoad = Storage.privateGet("load", "0");
if (firstLoad === "0") {
  State.update({
    ...state,
    openInfo: true,
  });
  Storage.privateSet("load", "1");
}

return (
  <Wrapper>
    <Header>
      <Widget src={`${creator}/widget/map-quest.header`} />
    </Header>
    {accountId && (
      <Widget
        src={`${Owner}/widget/Human-sidebar`}
        props={{
          humans: state.locations.length,
          profileModal: state.profileModal,
          filtersModal: state.filtersModal,
          showProfile: () => {
            State.update({ filtersModal: false, profileModal: true });
          },
          showFilters: () => {
            State.update({ filtersModal: true, profileModal: false });
          },
        }}
      />
    )}

    {accountId && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {state.hideInfor && (
          <Location
            class="btn"
            style={state.edit ? BtnStyle2 : BtnStyle}
            onClick={handleSaveLocation}
          >
            {`${!state.edit ? "Edit" : "Save"} location`}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M13 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
                <path d="M17.5 9.5c0 3.038-2 6.5-5.5 10.5c-3.5-4-5.5-7.462-5.5-10.5a5.5 5.5 0 1 1 11 0Z" />
              </g>
            </svg>
          </Location>
        )}
      </div>
    )}

    {accountId && state.profileModal && (
      <Widget
        src={`${Owner}/widget/Human-Profile-Modal`}
        props={{
          onClose: onProfileClose,
          API_URL,
          user: state.user,
          getMyInfor,
          showAlert,
        }}
      />
    )}

    {accountId && state.filtersModal && (
      <Widget
        src={`${Owner}/widget/Human-Filters-Modal`}
        props={{
          onClose: onFiltersClose,
          API_URL,
          user: state.user,
          role: state.filters.role,
          community: state.filters.community,
          changeRole: (id) => {
            State.update({ ...state, filters: { ...state.filters, role: id } });
          },
          changeCommunity: (id) => {
            const array = state.filters.community;
            const index = array.indexOf(id);
            if (index > -1) array.splice(index, 1);
            else array.push(id);

            State.update({
              ...state,
              filters: { ...state.filters, community: array },
            });
          },
          onFilter,
          clearFilter,
        }}
      />
    )}

    {/* 
     {accountId && !hasSBTToken && state.humanAlert && (
       <Widget
         src={`${Owner}/widget/HumanAlert`}
         props={{ onClose: onHumanClose }}
       />
     )} 
    */}

    <Widget
      src={`${Owner}/widget/Mapbox`}
      props={{
        API_URL,
        accessToken: MAP_TOKEN,
        styleUrl: MAP_STYLE,
        center,
        zoom,
        markers: state.locations,
        edit: state.edit,
        setInfoIcon,
      }}
    />

    {state.hideInfor && (
      <div
        className="position-absolute"
        style={{ bottom: 20, left: 20, zIndex: 2 }}
      >
        <button className="btn p-0" onClick={setOpenInfo}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2.5C24.6416 2.5 29.0932 4.34388 32.3753 7.626C35.6574 10.9081 37.5013 15.3596 37.5013 20.0012C37.5013 24.6429 35.6574 29.0944 32.3753 32.3765C29.0932 35.6586 24.6416 37.5025 20 37.5025C15.3584 37.5025 10.9069 35.6586 7.62478 32.3765C4.34266 29.0944 2.49878 24.6429 2.49878 20.0012C2.49878 15.3596 4.34266 10.9081 7.62478 7.626C10.9069 4.34388 15.3584 2.5 20 2.5ZM22.625 13.245C23.925 13.245 24.98 12.3425 24.98 11.005C24.98 9.6675 23.9225 8.765 22.625 8.765C21.325 8.765 20.275 9.6675 20.275 11.005C20.275 12.3425 21.325 13.245 22.625 13.245ZM23.0825 27.3125C23.0825 27.045 23.175 26.35 23.1225 25.955L21.0675 28.32C20.6425 28.7675 20.11 29.0775 19.86 28.995C19.7466 28.9533 19.6518 28.8724 19.5927 28.767C19.5336 28.6616 19.514 28.5385 19.5375 28.42L22.9625 17.6C23.2425 16.2275 22.4725 14.975 20.84 14.815C19.1175 14.815 16.5825 16.5625 15.04 18.78C15.04 19.045 14.99 19.705 15.0425 20.1L17.095 17.7325C17.52 17.29 18.015 16.9775 18.265 17.0625C18.3882 17.1067 18.4891 17.1974 18.5462 17.3152C18.6032 17.433 18.6117 17.5685 18.57 17.6925L15.175 28.46C14.7825 29.72 15.525 30.955 17.325 31.235C19.975 31.235 21.54 29.53 23.085 27.3125H23.0825Z"
              fill="#E8E8E8"
            />
          </svg>
        </button>
      </div>
    )}

    {state.openInfo && (
      <Widget
        src={`${Owner}/widget/Human-Information`}
        props={{ onClose: setOpenInfo }}
      />
    )}

    {state.alert && (
      <div
        className="d-flex justify-content-end absolute position-fixed"
        className="d-flex justify-content-end position-absolute"
        style={{ right: "5%", top: "5%", zIndex: 101 }}
      >
        <Widget
          props={{
            text: state.alert,
          }}
          src={`${Owner}/widget/Alert`}
        />
      </div>
    )}
  </Wrapper>
);