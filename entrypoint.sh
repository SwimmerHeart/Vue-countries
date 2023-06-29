function replace {
    sed -e "s#{{API_CBR}}#${API_CBR}#g" \
        $1
}

echo "prepare environment..."
echo "$(replace /etc/nginx/conf.d/default.conf  )" > /etc/nginx/conf.d/default.conf
echo "done"
nginx -g "daemon off;"