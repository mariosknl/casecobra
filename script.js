<script async src="//go.linkwi.se/delivery/js/tl.js"></script>
<script> window.lw=window.lw||function(){(lw.q=lw.q||[]).push(arguments)};lw .l=+new Date;
lw("setProgram", "13944"); lw("setDecimal", "."); </script>
 {% comment %}LINKWISE TRACKING SCRIPT{% endcomment %}

 {% assign discount_code = "" %}
 {%- if checkout.discount_applications.size > 0 -%}
 {% for discount_application in checkout.discount_applications %}
 {% if discount_code != "" %}
 {% capture temp %}
 {{ discount_code }}, {{ discount_application.title | split: ',' }}
 {% endcapture %}
 {% else %}
 {% capture temp %}
 {{ discount_application.title | split: ',' }}
 {% endcapture %}
 {% endif %}
 {% assign discount_code = temp %}
 {% assign discount_value = discount_application.total_allocated_amount %}
 {% endfor %}
 {%- endif -%}

 {% if discount_code contains 'LINKWISE_COUPON_99OFF' %}
 {% assign lw_disc = line_items_subtotal_price | times: 0.99 %}
 {% elsif discount_code contains 'LINKWISE_COUPON_FREE_SHIPPING' %}
 {% assign lw_disc = 0 %}
 {% elsif discount_code contains 'LINKWISE_COUPON_224OFF' %}
 {% assign lw_disc = line_items_subtotal_price | minus: 224.90 %}

 {% endif %}
 <script async src="//go.linkwi.se/delivery/js/tlwt.js"></script>

 <script> window.lw=window.lw||function(){(lw.q=lw.q||[]).push(arguments)};lw .l=+new Date;
 lw("setProgram", "13944");
 lw("setDecimal", ".");
 lw("setCurrency", "978");
 {%- for line_item in checkout.line_items -%}
 lw("addItem", {
 id: "{{ checkout.id }}" ,
 price: "{{ line_item.price | times: 0.01 | divided_by: 1.24 | round: 2 }}" ,
 quantity: "{{ line_item.quantity }}",
 payout: "1"
 });
 {%- endfor -%}
 lw("setCoupon", "{{ lw_disc | divided_by: 1.24 | divided_by: 100 | round: 2 }}");
 lw("thankyou", {
 orderid: "{{ checkout.id }}"
 ,status: "pending"
 });
 </script>

 <noscript>
 <img
 src="//go.linkwi.se/delivery/acl.php?program=13944&amp;decimal =.{%- for line_item in checkout.line_items -%}{%- assign item_index = forloop.index | minus: 1 -%}&amp;itemid[{{ forloop.index }}]={{ line_item.product_id }}&amp;itemprice[{{ forloop.index }}]={{ line_item.price | times: 0.01 | divided_by: 1.24 | round: 2 }}&amp;itemquantity[{{ forloop.index }}]={{ line_item.quantity }}&amp;itempayout[{{ forloop.index }}]=1&amp;{%- endfor -%}coupon_price={{ lw_disc | divided_by: 1.24 | divided_by: 100 | round: 2 }}&amp;status=pending&amp;orderid={{ checkout.id }}" style="width:0px;height:0px;"/>
 </noscript>