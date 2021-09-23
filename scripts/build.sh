#!/usr/bin/env sh

NEXT_PUBLIC_SENTRY_RELEASE=${NEXT_PUBLIC_SENTRY_RELEASE:=CF-${CF_PAGES_COMMIT_SHA:=dev}}

echo "Building release $NEXT_PUBLIC_SENTRY_RELEASE"

next build && next export
