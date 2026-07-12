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
} from "../../shared/enums/newsletters_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleNewsletter } from "../../shared/hooks/UseNewsletter";
const ViewNewsletter = ({ match }) => {
  const [data] = useSingleNewsletter(match.params.id);
  const { newsletter_loading, newsletter } = data;
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
        {!newsletter_loading ? (
          newsletter && (
            <SingleView
              data={newsletter}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={newsletter._id}
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

export default ViewNewsletter;
