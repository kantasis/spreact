package com.tutorials.spring_react.security;

import java.security.Key;
import java.util.Date;

import org.apache.catalina.connector.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {
   private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

   @Value("${custom.app.jwtSecret}")
   private String jwtSecret;

   @Value("${custom.app.jwtExpirationMs}")
   private int jwtExpirationMs;

   @Value("${custom.app.jwtCookieName}")
   private String jwtCookie;

   public String getJwtFromCookies(HttpServletRequest request){
      Cookie cookie = WebUtils.getCookie(request, jwtCookie);
      if (cookie == null)
         return null;
      return cookie.getValue();
   }

   public ResponseCookie generateJwtCookie(UserDetailsImpl principal){
      String jwt = generateTokenFromUsername(principal.getUsername());
      ResponseCookie cookie = ResponseCookie
         .from(jwtCookie, jwt)
         .path("/api")
         .maxAge(24 * 60 * 60)
         .httpOnly(true)
         .build();
      return cookie;
   }

   public ResponseCookie getCleanJwtCookie(){
      ResponseCookie cookie = ResponseCookie
         .from(jwtCookie, null)
         .path("/api")
         .build();
      return cookie;
   }

   public String getUsernameFromJwtToken(String token){
      return Jwts
         .parserBuilder()
         .setSigningKey(getKey())
         .build()
         .parseClaimsJws(token)
         .getBody()
         .getSubject();
   }

   private Key getKey(){
      return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
   }

   public boolean validateJwtToken(String authToken){
      try{
         Jwts
            .parserBuilder()
            .setSigningKey(getKey())
            .build()
            .parse(authToken);
         return true;
      }catch (MalformedJwtException e) {
         logger.error("Invalid JWT token: {}", e.getMessage());
      } catch (ExpiredJwtException e) {
         logger.error("JWT token is expired: {}", e.getMessage());
      } catch (UnsupportedJwtException e) {
         logger.error("JWT token is unsupported: {}", e.getMessage());
      } catch (IllegalArgumentException e) {
         logger.error("JWT claims string is empty: {}", e.getMessage());
      }
      return false;
   }

   public String generateTokenFromUsername(String username){
      Date todayDate = new Date();
      Date expirationDate = new Date(todayDate.getTime() + jwtExpirationMs);
      return Jwts
         .builder()
         .setSubject(username)
         .setIssuedAt(todayDate)
         .setExpiration(expirationDate)
         .signWith(getKey(), SignatureAlgorithm.HS256)
         .compact();
   }
}
