export default function CheckBlock() {
  return (
    <div>
      <h2>Checking fonts </h2>
      <div style={{ fontFamily: "inter", fontWeight: "bold" }}>
        Test Phrase by Inter-Bold
      </div>
      <div style={{ fontFamily: "inter" }}>Test Phrase by Inter-Regular</div>
      <div style={{ fontFamily: "nunito", fontWeight: "bold" }}>
        Test Phrase by Nunito-Bold
      </div>
      <div style={{ fontFamily: "nunito" }}>Test Phrase by Nunito-Regular</div>
      <div style={{ fontFamily: "open-sans", fontWeight: "bold" }}>
        Test Phrase by OpenSans-Bold
      </div>
      <div style={{ fontFamily: "open-sans" }}>
        Test Phrase by OpenSans-Regular
      </div>
      <div style={{ fontFamily: "proxima-nova", fontWeight: "bold" }}>
        Test Phrase by ProximaNova-Bold
      </div>
      <div style={{ fontFamily: "proxima-nova" }}>
        Test Phrase by ProximaNova-Regular
      </div>
      <div style={{ fontFamily: "roboto", fontWeight: "bold" }}>
        Test Phrase by Roboto-Bold
      </div>
      <div style={{ fontFamily: "roboto" }}>Test Phrase by Roboto-Regular</div>
      <div>
        <span style={{ fontFamily: "material-icons" }}>check_circle</span>
        <span style={{ fontFamily: "material-icons" }}>star</span>
        <span style={{ fontFamily: "material-icons" }}>favorite</span> by
        MaterialIcons-Regular
      </div>
      <h2>Checking one declaration rule classes </h2>
      <div className="background-color-green">
        class="background-color-green"
      </div>
      <div className="font-weight-bold">class="font-weight-bold"</div>
      <div className="display-flex">
        <div>Flex row child inside div with class="display-flex"</div>
        <div>Flex row child inside div with class="display-flex"</div>
        <div>Flex row child inside div with class="display-flex"</div>
      </div>
      <h2>Checking Botstrap CSS</h2>
      <div class="alert alert-success" role="alert">
        Alert-success
      </div>
      <button type="button" class="btn btn-primary">
        Button-primary
      </button>
      <h2>Checking Botstrap JS</h2>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
      >
        Collapse Button
      </button>
      <div class="collapse" id="collapseExample">
        Collapse Content
      </div>
    </div>
  );
}
