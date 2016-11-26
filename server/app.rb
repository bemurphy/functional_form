require "cuba"
require "cuba/contrib"
require "faker"
require "json"
require "mote"
require "ohm"
require "ohm/contrib"
require "rack/protection"
require "scrivener"
require "scrivener_errors"
require "shield"

Cuba.plugin Cuba::Mote
Cuba.plugin Cuba::Prelude
Cuba.plugin ScrivenerErrors::Helpers
Cuba.plugin Shield::Helpers

# Require all application files.
Dir["./models/**/*.rb"].each  { |rb| require rb }
Dir["./routes/**/*.rb"].each  { |rb| require rb }

# Require all helper files.
Dir["./helpers/**/*.rb"].each { |rb| require rb }
Dir["./filters/**/*.rb"].each { |rb| require rb }

Cuba.use Rack::MethodOverride
Cuba.use Rack::Session::Cookie,
  key: "my_new_app",
  secret: ENV.fetch("SESSION_SECRET")

Cuba.use Rack::Protection
Cuba.use Rack::Protection::RemoteReferrer

Cuba.use Rack::Static,
  root: "./public",
  urls: %w[/js /css /img]

AVATARS = %w[
https://s3.amazonaws.com/uifaces/faces/twitter/joshhemsley/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/benoitboucart/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/mattlat/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/johnsmithagency/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/terrorpixel/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/mslarkina/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/picard102/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/elliotnolten/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/alsobrooks/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/stan/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/yalozhkin/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/vitorleal/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/pierrestoffe/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/adhiardana/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/iqonicd/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/kamal_chaneman/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/overcloacked/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/thibaut_re/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/s4f1/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/sta1ex/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/jamiebrittain/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/_dwite_/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/katiemdaly/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/tom_even/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/missaaamy/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/operatino/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/gonzalorobaina/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/byrnecore/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/mikaeljorhult/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/wearesavas/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/haruintesettden/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/kushsolitary/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/msveet/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/oksanafrewer/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/hota_v/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/vlajki/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/popey/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/gaborenton/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/kanickairaj/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/tbakdesigns/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/shaneIxD/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/bluefx_/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/kurafire/128.jpg
https://s3.amazonaws.com/uifaces/faces/twitter/gojeanyn/128.jpg
]

Cuba.define do
  def generate_submissions(form_id)
    1.upto(10).map do |i|
      {
        id: i,
        email: Faker::Internet.email.sub("@", "+#{form_id}@"),
        avatar: AVATARS.sample,
        name: Faker::Name.name,
        phone_number: Faker::PhoneNumber.phone_number,
        bio: Faker::Lorem.sentence
      }
    end
  end

  res.headers["Content-Type"] = "application/json"
  res.headers["Access-Control-Allow-Origin"] = "*"

  persist_session!

  on get, "forms" do |form_id|
    forms = [
      { id: 1, name: "Test Form Cuba" },
      { id: 2, name: "Other Form" },
      { id: 3, name: "Another Form" },
    ]

    res.write JSON.dump(forms)
  end

  on get, "submissions/:form_id" do |form_id|
    res.write JSON.dump(generate_submissions(form_id))
  end
end
