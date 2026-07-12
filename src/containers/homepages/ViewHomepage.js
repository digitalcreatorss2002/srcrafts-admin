import React, { useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import Spinner from "../../components/layout/Spinner";
import {
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
} from "../../shared/enums/homepages_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleHomepage } from "../../shared/hooks/UseHomepage";
const ViewHomepage = ({ match }) => {
  const [data] = useSingleHomepage(match.params.id);
  const { homepage_loading, homepage } = data;
  return (
    <div className="pace-done">
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_SINGLE_TITLE}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink="View"
        />
        {!homepage_loading ? (
          homepage && (
            <SingleView
              data={homepage}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={homepage._id}
              SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
            />
          )
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewHomepage;
