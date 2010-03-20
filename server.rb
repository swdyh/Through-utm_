require 'rubygems'
require 'sinatra'

get '/' do
  img_url = 'http://mozilla.jp/img/tignish/products/title-firefox.png'
  <<-EOS
   <a href="/foo?utm_campaign=foo&hoge=hoge">/foo?utm_campaign=foo&hoge=hoge</a><br />
   <img src="#{img_url}" /><br />
   <img src="#{img_url}?utm_content=c" /><br />
   <a href="#{img_url}?utm_content=c">#{img_url}?utm_content=c</a><br />
  EOS
end

get '/foo' do
  '<p>params:' + params.inspect + '</p>'
end
