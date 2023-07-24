function replace {
    sed -e "s#{{API_CBR}}#${API_CBR}#g" \
        -e "s#{{API_COUNTRIES}}#${API_COUNTRIES}#g" \
        -e "s#{{API_UNIVERSITIES}}#${API_UNIVERSITIES}#g" \
        $1
}

echo "prepare environment..."
echo "$(replace /etc/nginx/conf.d/default.conf  )" > /etc/nginx/conf.d/default.conf
echo "done"
nginx -g "daemon off;"